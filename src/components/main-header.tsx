"use client"

import Link from "next/link"
import { useAccount } from "wagmi";
import { useEffect } from "react";
import {useRouter} from "next/navigation"
import SignInButton from "./sign-in-button";
import SignUpButton from "./sign-up-button";

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
                <Link href="/">FarmBase</Link>

                {
                    address ? <nav>
                        <ul className="flex items-center gap-10">
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/orders">Orders</Link></li>
                            <li><Link href="/profile">Profile</Link></li>
                        </ul>
                    </nav> : null
                }
                <ul className="flex justify-end items-center gap-5">
                    <li><SignUpButton /></li>
                    <li> {!address && <SignInButton />}</li>
                </ul>
            </div>
        </header>
    )
}