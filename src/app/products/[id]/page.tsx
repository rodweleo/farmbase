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
import { useState } from "react"

type Call = {
    to: Hex;
    data?: Hex;
    value?: bigint;
};

export default function Page() {
    const { id } = useParams();
    const { product, error, isLoading } = useProductQuery({ id });
    const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);


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
        <div className="max-w-7xl mx-auto mt-16 md:p-8">
        <Link
          href="/"
          className="flex items-center mb-6 text-slate-700 hover:text-[#4CAF50] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
      
        <section className="grid grid-cols-2 place-items-stretch sm:grid-cols-2 gap-12">
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={500}
            className="rounded-xl shadow-lg w-full cursor-pointer transition-transform transform hover:scale-105"
          />
      
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <h1 className="font-bold text-2xl lg:text-4xl text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-md lg:text-xl text-slate-400">{product.description}</p>
              <h2 className="text-xl lg:text-2xl font-bold text-green-600">
                {Number(product.price)} ETH
              </h2>
            </div>
      
            <Card className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6 w-full flex flex-wrap gap-5 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={seller.avatar} alt={seller.name} />
                    <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-800">{product.farmer}</h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>
                        {seller.rating} • {seller.sales.toLocaleString()} sales
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="ml-1 rounded-full px-4 py-2 transition-colors hover:bg-orange-500 hover:text-white"
                >
                  View Store
                </Button>
              </CardContent>
            </Card>
      
            <div className="flex space-x-4 mt-6">
              <TransactionWrapper calls={calls} text="Buy Now" />
              <Button
                variant="outline"
                size="icon"
                className="rounded-md transition-colors hover:bg-orange-500 hover:text-white"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-md transition-colors hover:bg-orange-500 hover:text-white"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      )

}