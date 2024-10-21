"use client"

import AddFarmerProductForm from "@/components/add-farmer-product-form";
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
export default function Page(){
    const router = useRouter()
    return (
        <div className=" py-5 w-full grid place-items-center">
            <main className="container">
                <button
                    type="button"
                    title="Go Back"
                    onClick={() => router.back()}
                    className="flex items-center mb-6 text-[#4CAF50] transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Go Back
                </button>
                <AddFarmerProductForm />
            </main>
            
        </div>
    )
}