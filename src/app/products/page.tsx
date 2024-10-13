"use client"

import { baseSepolia } from 'wagmi/chains';
import { useAccount, useContractRead } from 'wagmi';
import { contracts } from '@/contracts';
import ProductList from '@/components/product-list';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import Link from "next/link"

export default function Page(){
    const {address} = useAccount()
    const { data, error, isLoading } = useContractRead({        address: contracts[0].address,
        abi: contracts[0].abi,
        functionName: 'getProductsByFarmer',
        chainId: baseSepolia.id,
        args: [address as `0x${string}`]
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data !== undefined && data.length === 0) {
        return <div className="container py-10 bg-white rounded-md shadow-md mt-5 h-full grid place-items-center">
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
            <main className="bg-white px-4 py-6 rounded-xl shadow-md">
                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl">My Products</h1>
                    <Button><Link href="/products/add-product">Add Product</Link></Button>
                </div>
                {data !== undefined && <ProductList className="flex gap-5 flex-wrap" products={data} />}
            </main>
        </div>
    )
}