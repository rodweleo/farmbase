"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function CheckoutBtn(){
    const router = useRouter()
    return (
        <Button size="lg" className="w-full mt-6 rounded-full bg-green-600 hover:bg-green-500" onClick={() => router.push("/checkout")}>Proceed to Checkout</Button>
    )
}