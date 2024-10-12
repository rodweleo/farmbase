"use client"

import { contracts } from "@/contracts";
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";
import { useContractRead } from "wagmi"


export const getBuyerOrders = (buyerAddress) => {
    const { data, error, isLoading } = useContractRead({
        address: contracts[3].address,
        abi: contracts[3].abi,
        functionName: 'getAllOrders',
        chainId: baseSepolia.id,
        args: []
    });

    const buyerOrders = useMemo(() => {
        if (data) {
            return data.filter((ele) => ele.buyer === buyerAddress)
        }
        return [];
    }, [data, buyerAddress]);

    return {
        buyerOrders, data, error, isLoading
    }
}