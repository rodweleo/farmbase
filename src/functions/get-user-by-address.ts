"use client"

import { contracts } from "@/contracts";
import { useMemo } from "react";
import { baseSepolia } from "viem/chains";
import { useContractRead     } from "wagmi"

export const getUserByAddress = (address) => {
    const { data, error, isLoading } = useContractRead({
        address: contracts[1].address,
        abi: contracts[1].abi,
        functionName: 'getUserDetails',
        chainId: baseSepolia.id,
        args: [address as `0x${string}`]
    });

    const user = useMemo(() => {
        if (data) {
            return {
                name: data[0],
                email: data[1],
                role: data[2] === 0 ? "seller" : "buyer",
                isRegistered: data[3],
            };
        }
        return null;
    }, [data]);

    return {
        user, data, error, isLoading
    }
}
