"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {useRouter} from "next/navigation"
import { CircleCheck } from 'lucide-react';
import { Store } from 'lucide-react';
export default function SellOnFarmbaseBtn() {
    const router = useRouter()


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-green-500 text-white hover:bg-green-600 px-6 font-normal flex items-center gap-2"><Store className="h-4 w-4 text-white"/> <span>Sell on FarmBase</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Become a Seller on FarmBase</DialogTitle>
                    <DialogDescription>
                        To start selling items on FarmBase, you need to update your account type to a seller account.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-1">
                    <p>
                        Updating your account will allow you to:
                    </p>
                    <ul className="mt- space-y-1">
                        <li className="flex items-center gap-1 "><CircleCheck className="h-4 w-4 text-green-500"/> Post items for sale</li>
                        <li className="flex items-center gap-1"><CircleCheck className="h-4 w-4 text-green-500" />Manage your inventory</li>
                        <li className="flex items-center gap-1"><CircleCheck className="h-4 w-4 text-green-500" />Receive payments from buyers</li>
                    </ul>
                </div>
                <DialogFooter className="flex items-center sm:justify-between">
                    <DialogClose asChild>
                        <Button className="rounded-full bg-green-500 text-white hover:bg-green-600 px-6 font-normal" onClick={() => router.push("/profile")}>
                            Update to Seller Account
                        </Button>
                    </DialogClose>
                    
                    <DialogClose asChild>
                        <Button variant="secondary" className="rounded-full px-6 font-normal">
                            Cancel
                        </Button>
                    </DialogClose>
                
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}