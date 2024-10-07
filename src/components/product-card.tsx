"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import toast from 'react-hot-toast';
import TransactionWrapper from './transaction-wrapper'

export default function ProductCard({ product }) {
    const [isPurchasing, setIsPurchasing] = useState(false)

    const { id, name, description, price, image } = product;
    const handlePurchase = async () => {
        setIsPurchasing(true)
        toast.success("Item purchased.")

        setTimeout(() => {
            setIsPurchasing(false)
        }, 2000)
    }

    return (
        <div key={id} className="w-full max-w-[250px] rounded-md cursor-pointer overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-[0.5] border">
            <div className="relative overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    className="object-fill w-full h-full transition-transform duration-300 transform hover:scale-[1.025]"
                    width={300}
                    height={200}
                    priority
                />

            </div>
            <div className="p-2">
                <h3 className="text-xl font-semibold whitespace-nowrap overflow-hidden line-clamp-1 text-ellipsis">{name}</h3>
                <p className="text-md text-gray-600 mb-4">{description}</p>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">{Number(price)} BASE</span>
                    </div>
                    <Button
                        onClick={handlePurchase}
                        disabled={isPurchasing}
                        className="text-white font-bold py-2 px-4 w-2/4 transition-colors duration-300"
                    >
                        {isPurchasing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buy Now
                            </>
                        )}
                    </Button>
                    <div className="hidden"></div>
                </div>
            </div>
            
        </div>
    )
}