"use client"

import { contracts } from "@/contracts"
import { publicClient } from "@/utils/publicClient"
import { useEffect, useState } from "react"
import {Hex} from "viem"

export const useUser = ({address}: {
    address : Hex
}) => {
    const [user, setUser] = useState()
    const [error, setError] = useState()
    
    useEffect(() => {
        const getUserDetails = async () => {
            try{
                const data = await publicClient.readContract({
                    address: contracts[1].address,
                    abi: contracts[1].abi,
                    functionName: 'getUserDetails',
                    args: [address as `0x${string}`]
                })

                const user = {
                    name: data[0],
                    email: data[1],
                    role: data[2] === 1 ? "seller" : "buyer",
                    isRegistered: data[4]
                }

                setUser(user)
            }catch(e){
                setError(e)
            }
        }

        getUserDetails()
    }, [address])


    return { user, error}
}