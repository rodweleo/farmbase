"use client"

import Link from "next/link"
import { useAccount } from "wagmi";
import { useEffect } from "react";
import {useRouter} from "next/navigation"
import SignInButton from "./sign-in-button";
import SignUpButton from "./sign-up-button";
import Image from "next/image"

export default function MainHeader(){
    const {address, isDisconnected} = useAccount()
    const router = useRouter()
    useEffect(() =>{
        if(!address && isDisconnected){
            router.push("/")
        }
    }, [address, isDisconnected, router])
    
    return (
        <header className="flex h-20 shadow-md sticky top-0 w-full z-50 bg-white">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center text-xl gap-1">
                    <Image src="/FarmBase.png" width={20} height={20} alt="FarmBase Logo" className="rounded-full"/>
                    <h1 className="font-semibold">FarmBase</h1>
                </Link>

                <nav>
                    <ul className="flex items-center gap-10">
                        {address && <>
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/orders">Orders</Link></li>
                            <li><Link href="/profile">Profile</Link></li>
                        </>}
                        <li><Link href="/swap">Swap Tokens</Link></li>
                    </ul>
                </nav>
                <ul className="flex justify-end items-center gap-5">
                    <li><SignUpButton /></li>
                    <li> {!address && <SignInButton />}</li>
                </ul>
            </div>
        </header>
    )
}