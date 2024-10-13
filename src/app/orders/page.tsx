"use client"

import { useAccount } from "wagmi"
import { getUserByAddress } from "@/functions/get-user-by-address";
import { BuyerOrdersDashboard } from "@/components/buyer-orders-dashboard";
import { SellerOrdersDashboard } from "@/components/seller-orders-dashboard";

export default function Page() {
    const { address} = useAccount();
    const { user } = getUserByAddress(address)

    return (
        <div className="container py-5">
           <main className="px-4 py-6 rounded-xl bg-white shadow-md">
                <h1 className="font-bold text-2xl">My Orders</h1>
                {
                    user?.role === "buyer" ? <BuyerOrdersDashboard buyer={address} /> : <SellerOrdersDashboard seller={address} />
                }
           </main>
        </div>
    )
}