"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import {contracts} from "@/contracts"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {weiToEth} from '@/functions/wei-to-eth'
import { useRouter } from "next/navigation"
import {toast} from "react-hot-toast"
import { useAccount } from 'wagmi'
import { getUserByAddress } from '@/functions/get-user-by-address'
import TransactionWrapper from '@/components/transaction-wrapper'
import { Call } from "@/utils/types"
import { encodeFunctionData } from 'viem';

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('card')
    const {address} = useAccount()
    const {user} = getUserByAddress(address)

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const subtotal = weiToEth(cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0))
    const total = weiToEth(cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0))

    const orderItem = {
        buyer: address ? address : contracts[2].address,
        productId: cartItems.length > 0 && cartItems[0].id,
        quantity: cartItems.length > 0 && cartItems[0].quantity,
        price: cartItems.length > 0 && cartItems[0].price,
        seller: cartItems.length > 0 && cartItems[0].farmer
    }

    const encodedPlaceOrderData = encodeFunctionData({
        abi: contracts[3].abi,
        functionName: 'createOrder',
        args: [orderItem.buyer, orderItem.productId, orderItem.quantity, orderItem.price, orderItem.seller]
    })
    const calls: Call[] = [
        {
            to: contracts[3].address,
            data: encodedPlaceOrderData,
            value: BigInt(cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0))
        },
    ];



    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-6 py-10">
                <Link href="/cart" className="flex items-center text-green-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                </Link>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <input type="text" id="firstName" className="w-full border rounded px-3 py-2" defaultValue={user?.name.split(" ")[0]} />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <input type="text" id="lastName" className="w-full border rounded px-3 py-2" defaultValue={user?.name.split(" ")[1]} />
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <input type="text" id="address" className="w-full border rounded px-3 py-2" />
                                </div>
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <input type="text" id="city" className="w-full border rounded px-3 py-2" />
                                </div>
                                <div>
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <input type="text" id="zipCode" className="w-full border rounded px-3 py-2" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Payment  Method</h2>
                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2 mb-2">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card">Credit/Debit Card</Label>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <RadioGroupItem value="bitcoin" id="bitcoin" />
                                    <Label htmlFor="bitcoin">Bitcoin</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ethereum" id="ethereum" />
                                    <Label htmlFor="ethereum">Ethereum</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Card Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="cardNumber">Card Number</Label>
                                        <input type="text" id="cardNumber" className="w-full border rounded px-3 py-2" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="expirationDate">Expiration Date</Label>
                                        <input type="text"
                                            id="expirationDate"
                                            placeholder="MM/YY"
                                            className="w-full border rounded px-3 py-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="cvv">CVV</Label>
                                        <input type="text" id="cvv" className="w-full border rounded px-3 py-2" required />
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'bitcoin' && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Bitcoin Payment</h2>
                                <p className="mb-2">Send the exact amount to the following Bitcoin address:</p>
                                <input type="text" value="" className="w-full border rounded px-3 py-2 bg-gray-100" readOnly />
                            </div>
                        )}

                        {paymentMethod === 'ethereum' && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Ethereum Payment</h2>
                                <p className="mb-2">Send the exact amount to the following Ethereum address:</p>
                                <input type="text" value={cartItems[0].farmer} className="w-full border rounded px-3 py-2 bg-gray-100" readOnly />
                            </div>
                        )}

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{subtotal} Eth</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>{total} Eth</span>
                            </div>
                        </div>

                        <TransactionWrapper calls={calls} text="Place Order"/>
                    </div>
                </div>
            </main>
        </div>
    )
}