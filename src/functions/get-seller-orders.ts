"use client"

import { contracts } from "@/contracts";
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";
import { useContractRead } from "wagmi"


export const getSellerOrders = (sellerAddress) => {
    const { data, error, isLoading } = useContractRead({
        address: contracts[3].address,
        abi: contracts[3].abi,
        functionName: 'getAllOrders',
        chainId: baseSepolia.id,
        args: []
    });

    const sellerOrders = useMemo(() => {
        if (data) {
            return data.filter((ele) => ele.item.seller === sellerAddress)
        }
        return [];
    }, [data, sellerAddress]);

    return {
        sellerOrders, data, error, isLoading
    }
}