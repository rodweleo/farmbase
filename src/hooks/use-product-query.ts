"use client"

import { contracts } from "@/contracts"
import { ProductProps } from "@/utils/types"
import { useContractReads } from "wagmi"

export const useProductQuery = ({id}: {
    id: string
}) => {
    const bigIntId = id;
    const {data, error, isLoading} = useContractReads({
        contracts: [
            {
                address: contracts[0].address,
                abi: contracts[0].abi,
                functionName: 'getProductDescription',
                args: [bigIntId]
            },
            {
                address: contracts[0].address,
                abi: contracts[0].abi,
                functionName: 'getProductFarmer',
                args: [bigIntId]
            },
            {
                address: contracts[0].address,
                abi: contracts[0].abi,
                functionName: 'getProductImage',
                args: [bigIntId]
            },
            {
                address: contracts[0].address,
                abi: contracts[0].abi,
                functionName: 'getProductPrice',
                args: [bigIntId]
            },
            {
                address: contracts[0].address,
                abi: contracts[0].abi,
                functionName: 'getProductStock',
                args: [bigIntId]
            },
            {
                address: contracts[0].address,
                abi: contracts[0].abi,
                functionName: 'getProductName',
                args: [bigIntId]
            }
        ],
    })

    if(!data){
        const product: ProductProps = {
            id: BigInt(0),
            description: "",
            farmer: "0x",
            image: "",
            price: BigInt(0),
            stock: BigInt(0),
            name: ""
        }
        return {
            product, 
            error, 
            isLoading
        }
    }

    const product = {
        description: data[0].status === "success" ? data[0].result : "",
        farmer: data[1].status === "success" ? data[1].result : "",
        image: data[2].status === "success" ? data[2].result : "",
        price: data[3].status === "success" ? data[3].result : "",
        stock: data[4].status === "success" ? data[4].result : "",
        name: data[5].status === "success" ? data[5].result : "",
    }

    return {product, error, isLoading}
}