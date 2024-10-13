
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { getUserByAddress } from '@/functions/get-user-by-address';
import { useAccount } from 'wagmi';
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { useWriteContract } from 'wagmi'
import {contracts} from "@/contracts"
import {Loader2} from "lucide-react"
import {toast} from "react-hot-toast"
type UserProfile = {
    firstName: string
    lastName: string
    email: string
    role: 'buyer' | 'seller'
    walletAddress: `0x${string}`
}

export default function Page() {
    const { address } = useAccount()
    const { user } = getUserByAddress(address)
    const router = useRouter()
    const { writeContract, data, isPending } = useWriteContract()
    const firstName = user?.name.split(" ")[0];
    const lastName = user?.name.split(" ")[1]
    const role = user ? user.role : "buyer";


    const [userProfile, setUserProfile] = useState<UserProfile>({
        firstName: firstName,
        lastName: lastName,
        email: user?.email,
        role: role,
        walletAddress: address
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleRoleChange = (value: 'buyer' | 'seller') => {
        setUserProfile(prev => ({ ...prev, role: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const fullName = userProfile.firstName + " " + userProfile.lastName
        const modifiedRole = userProfile.role === "seller" ? 0 : 1;

        writeContract({
            abi: contracts[1].abi,
            address: contracts[1].address,
            functionName: 'updateUserDetails',
            args: [
                fullName,
                userProfile.email,
                modifiedRole,
            ],
        })
    }

    if(data){
        toast.success("Your profile has been successfully updated. Reload the page for the changes to take effect.")
        setTimeout(() => {
            router.push("/profile")
        }, 2000)
    }

    return (
        <div className="py-5">
            <main>
                <Card className="w-full max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Edit Profile</CardTitle>
                            <CardDescription>Fill out your updated profile information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        defaultValue={userProfile.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={userProfile.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userProfile.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Registered As</Label>
                                <RadioGroup
                                    value={userProfile.role}
                                    onValueChange={handleRoleChange}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="buyer" id="buyer" />
                                        <Label htmlFor="buyer">Buyer</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="seller" id="seller" />
                                        <Label htmlFor="seller">Seller</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div>
                                <Label htmlFor="walletAddress">Wallet Address</Label>
                                <Input
                                    id="walletAddress"
                                    name="walletAddress"
                                    defaultValue={userProfile.walletAddress}
                                    required
                                />
                            </div>

                        </CardContent>
                        <CardFooter className="flex justify-end space-x-4">
                            <Button type="reset" variant="outline" onClick={() => router.push("/profile")}>Cancel</Button>
                            <Button type="submit" disabled={isPending} className="disabled:cursor-not-allowed"> {isPending ? <div className='flex items-center gap-2'><Loader2 className="h-4 w-4 animate-spin" /> Saving...</div> : "Save Changes"} </Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    )
}