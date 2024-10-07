"use client"

import { baseSepolia } from 'wagmi/chains';
import { useAccount, useContractRead } from 'wagmi';
import { contracts } from '@/contracts';
import ProductList from '@/components/product-list';
import {useEffect} from "react"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import Link from "next/link"

export default function Page(){
    const {address, isConnecting} = useAccount()
    const router = useRouter()
    const { data, error, isLoading } = useContractRead({
        address: contracts[0].address,
        abi: contracts[0].abi,
        functionName: 'getProductsByFarmer',
        chainId: baseSepolia.id,
        args: [address as `0x${string}`]
    });

    useEffect(() => {
        if(!address){
            router.push('/')
        }
    }, [address, router, isConnecting])

    if (isLoading) {
        return "Loading..."
    }

    if (data?.length === 0) {
        return "No Products Available"
    }

    if (error) {
        return 'Something went wrong' + error;
    }
    return (
        <main className="space-y-2.5">
            <div className="flex justify-between">
                <h1 className="font-bold text-2xl">My Products</h1>
                <Button><Link href="/products/add-product">Add Product</Link></Button>
            </div>
            <ProductList className="flex gap-5 flex-wrap" products={data}/>
        </main>
    )
}