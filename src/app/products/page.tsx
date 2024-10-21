"use client"

import { baseSepolia } from 'wagmi/chains';
import { useAccount, useContractRead } from 'wagmi';
import { contracts } from '@/contracts';
import { Button } from '@/components/ui/button';
import Link from "next/link"
import { SellerProductList } from '@/components/seller-product-list';
import { useRouter } from "next/navigation"
import { useEffect } from 'react';
import {
    Separator
} from "@/components/ui/separator"
import { Package } from 'lucide-react';

export default function Page() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const { data, error, isLoading } = useContractRead({
        address: contracts[0].address,
        abi: contracts[0].abi,
        functionName: 'getProductsByFarmer',
        chainId: baseSepolia.id,
        args: [address as `0x${string}`]
    });

    

    useEffect(() => {
        if (!isConnected) {
            router.replace("/")
        }
    }, [address, router, isConnected])

    if (isLoading) {
        return <div className="container py-10">Loading...</div>
    }

    if (data !== undefined && data.length === 0) {
        return <div className="container py-10 bg-white rounded-md shadow-md h-full grid place-items-center">
            <main className="flex flex-col items-center space-y-4">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold">No Products Available in Your Inventory.</h1>
                    <p className="text-slate-500">Looks like you haven't added any product</p>
                </div>
                <Button><Link href="/products/add-product">Add Product</Link></Button>
            </main>
        </div>
    }

    if (error) {
        return 'Something went wrong' + error;
    }
    return (
        <div className="container py-5">
            <main className="bg-white px-4 py-6 rounded-lg space-y-2 shadow-md">
                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl">My Products</h1>
                    <Button><Link href="/products/add-product">Add Product</Link></Button>
                </div>
                {
                    data !== undefined &&
                    <section className="space-y-4">
                            <div className='flex gap-4 items-center border rounded-md w-fit p-4'>
                                <Package className='h-10 w-10 text-green-500' />
                                <div>
                                    <h1 className="font-bold text-2xl">{data.length}</h1>
                                    <p className="font-normal text-slate-500">Total Products</p>
                                </div>
                            </div>
                            <Separator/>
                        <SellerProductList products={data} />
                    </section>
                }
            </main>
        </div>
    )
}