'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getUserByAddress } from '@/functions/get-user-by-address';
import { useAccount } from 'wagmi';
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";


export default function ProfilePage() {
    const { address } = useAccount()
    const router = useRouter()
    const { user, isLoading } = getUserByAddress(address)

    const firstName = user?.name.split(" ")[0];
    const lastName = user?.name.split(" ")[1]
    const role = user ? user.role : "buyer";



    return (
        <div className="container mx-auto p-4">
            {
                isLoading ? <div>Loading...</div> : <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                        <CardDescription>View and manage your profile information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>First Name</Label>
                                    <p className="text-lg">{firstName}</p>
                                </div>
                                <div>
                                    <Label>Last Name</Label>
                                    <p className="text-lg">{lastName}</p>
                                </div>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <p className="text-lg">{user?.email}</p>
                            </div>
                            <div>
                                <Label>Role</Label>
                                <p className="text-lg capitalize">{role}</p>
                            </div>
                            <div>
                                <Label>Wallet Address</Label>
                                <p className="text-lg break-all">{address}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button onClick={() => router.push("/profile/edit")}>Edit Profile</Button>
                    </CardFooter>
                </Card> 
            }
        </div>
    )
}