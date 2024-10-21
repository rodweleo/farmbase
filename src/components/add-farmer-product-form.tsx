"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useWriteContract } from 'wagmi'
import { contracts } from "@/contracts";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import {toast} from "react-hot-toast"
import { ChangeEventHandler } from 'react'
import axios from "axios"
import { fileToGenerativePart } from '@/functions/fileToGenerativePart'
import Image from "next/image"
import {useRef, useState} from "react"
import TransactionWrapper from '@/components/transaction-wrapper'
import { Call } from "@/utils/types"
import { encodeFunctionData } from 'viem';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a positive number.",
    }),
    stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Stock must be a non-negative number.",
    }),
    image: z.string({
        message: "Please enter a valid URL for the image.",
    })
})

export default function AddFarmerProductForm() {
    const productImageRef = useRef<HTMLImageElement | null>(null)
    const [productImageReport, setProductImageReport] = useState(null);
    const { writeContract, status } = useWriteContract()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        writeContract({
            abi: contracts[0].abi,
            address: contracts[0].address,
            functionName: 'addProduct',
            args: [
                values.name,
                values.description,
                BigInt(values.price),
                BigInt(values.stock),
                values.image.toString()
            ],
        })

    }

    // const encodedPlaceOrderData = encodeFunctionData({
    //     abi: contracts[0].abi,
    //     functionName: 'addProduct',
    //     args: [
    //         values.name,
    //         values.description,
    //         BigInt(values.price),
    //         BigInt(values.stock),
    //         values.image
    //     ],
    // })
    // const calls: Call[] = [
    //     {
    //         to: contracts[3].address,
    //         data: encodedPlaceOrderData,
    //         value: 0n
    //     },
    // ];

    if(status === "success"){
        toast.success("Product added successfully!")
    }

    if(status ==="error"){
        toast.error("Something went wrong. Please try again.")
    }

    

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files?.[0]

        if(!file){
            toast.error("Please enter a product image!")
            return;
        }

        try {
        //display the image
        const reader = new FileReader(); // Create a FileReader instance
        reader.onload = (e) => {
            form.setValue("image", e.target.result)
            // Set the src of the image using the FileReader result
            if (productImageRef.current) {
                productImageRef.current.src = e.target.result;
                productImageRef.current.style.display = 'block'; // Show the image
            }
        };
        reader.readAsDataURL(file);
      
        const imagePart = await fileToGenerativePart(file)
        const prompt = "You are an Agriculture expert. Analyze the image and determine whether it is a farming too such as a machinery that can be used in farming, farm input e.g fertilizer or a farm out put like farm grown food or animals. If it is looks like it matches the conditions, return the answer in json format  {isAgricultureItem : true, reason} else {isAgricultureItem : false, reason: }. The format should be an object with only the two entities."
        
            const formData = new FormData();
            formData.append("data", imagePart.inlineData.data as string);
            formData.append("mimeType", imagePart.inlineData.mimeType as string)
            formData.append("prompt", prompt as string)
            const response = await axios.post('/api/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProductImageReport(response.data)

            if (response.data.isAgricultureItem) {
                if (productImageRef.current) {
                    productImageRef.current.style.border = "3px solid";
                    productImageRef.current.style.borderColor = "#22c55e"
                }
            } else {
                if (productImageRef.current) {
                    productImageRef.current.style.border = "3px solid";
                    productImageRef.current.style.borderColor = "red"
                }
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to analyze the image.");
        }
       
    }



    return (
        <Form {...form}>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Add Product</CardTitle>
                    <CardDescription>Fill in the product descriptions below.</CardDescription>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The name of your product as it will appear in the listing.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your product"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a detailed description of your product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (in Wei)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter price in Wei"
                                            {...field}
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Set the price for your product in Wei (1 Ether = 1e18 Wei).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter available stock" {...field} min={0} />
                                    </FormControl>
                                    <FormDescription>
                                        The number of items available for sale.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col w-full gap-2.5 hidden">
                            <FormField
                                name=""
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input type="file"  {...field} onChange={handleFileChange} />
                                        </FormControl>
                                        <FormDescription>
                                            Provide the sample image of the product
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="hidden">
                                <Image ref={productImageRef} src="" height={200} width={200} className="hidden rounded-md" alt=""/>
                            {
                                productImageReport && !productImageReport.isAgricultureItem  ? <div className=" p-4 rounded-md bg-red-200 text-red-500 font-normal text-lg">
                                    <p>{productImageReport.isAgricultureItem && "The product you have posted is not a valid agriculture entity"}</p>
                                    <p>{productImageReport.reason}</p>
                                </div> : null
                            }
                            </div>
                        </div>
                        <FormField
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide the sample image of the product
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={status === "pending"}>
                            {status === "pending" ? "Adding Product..." : "Add Product"}
                        </Button>
                        {/* <TransactionWrapper calls={calls} text="Add Product"/> */}
                    </CardFooter>
                </form>
            </Card>
        </Form>
    )
}