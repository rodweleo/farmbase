"use client"

import { contracts } from "@/contracts";
import { useContractRead } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const useAllProductsQuery = () => {

    const { data, error, isLoading } = useContractRead({
        address: contracts[0].address,
        abi: contracts[0].abi,
        functionName: 'getAllProducts',
        chainId: baseSepolia.id
    });

    const products = data ? data : []
    return {products, error, isLoading}
}