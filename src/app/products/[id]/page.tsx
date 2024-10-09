"use client"

import { useProductQuery } from "@/hooks/use-product-query"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, ArrowLeft, Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TransactionWrapper from "@/components/transaction-wrapper"
import { encodeFunctionData, Hex } from 'viem';
import { ethers } from "ethers";
import Link from "next/link"

type Call = {
    to: Hex;
    data?: Hex;
    value?: bigint;
};

export default function Page() {
    const { id } = useParams();
    const { product, error, isLoading } = useProductQuery({ id });

    const { farmer } = product;
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PaymentSent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "recipient",
                    "type": "address"
                }
            ],
            "name": "sendFunds",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const address = "0xd015b10d9dff563a393158e0765aef22d823f7c9"


    const encodedSendFundsData = encodeFunctionData({
        abi: abi,
        functionName: 'sendFunds',
        args: [farmer.length > 0 ? farmer : "0xd015b10d9dff563a393158e0765aef22d823f7c9"]
    })
    const calls: Call[] = [
        {
            to: address,
            data: encodedSendFundsData,
            value: BigInt(ethers.parseEther("0.1").toString())
        },
    ];
    const seller = {
        name: "AudioTech Inc.",
        rating: 4.9,
        sales: 10000,
        avatar: "/placeholder.svg?height=40&width=40"
    }

    if (error) {
        return (
            <div>
                {error ? "Something went wrong:" + error : null}
            </div>
        )
    }

    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>
    }

    if (product === null) {
        return (
            <div>
                Product information not found
            </div>
        )
    }


    return (
        <div className="container mx-auto mt-5">
            <Link href="/" className="flex items-center text-green-600 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
            </Link>
            <section className="flex gap-10 w-full">
                <Image src={product.image} alt={product.name} width={700} height={700} className="rounded-xl" />
                <div className="flex flex-col justify-between w-1/2">
                    <div className="space-y-2.5">
                        <div className="space-y-1">
                            <h1 className="font-bold text-4xl">{product.name}</h1>
                            <p className="text-slate-500 text-md">{product.description}</p>
                        </div>
                        <h2 className="text-green-500 text-xl font-bold">{Number(product.price)} ETH</h2>
                    </div>

                    {/* Seller Information */}
                    <Card className="w-full">
                        <CardContent className="p-4 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex space-x-4 items-center">
                                    <Avatar>
                                        <AvatarImage src={seller.avatar} alt={seller.name} />
                                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{product.farmer}</h3>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="ml-1 text-sm">{seller.rating} • {seller.sales.toLocaleString()} sales</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="ml-auto">View Store</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex space-x-4">
                        <TransactionWrapper calls={calls} text="Buy Now" />
                        <Button variant="outline" size="icon">
                            <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>)

}