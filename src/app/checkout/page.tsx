"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from 'react'

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('card')

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-6 py-10">
                <Link href="/cart" className="flex items-center text-green-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                </Link>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
                    <form>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <input type="text" id="firstName" className="w-full border rounded px-3 py-2" required />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <input type="text" id="lastName" className="w-full border rounded px-3 py-2" required />
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <input type="text" id="address" className="w-full border rounded px-3 py-2" required />
                                </div>
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <input type="text" id="city" className="w-full border rounded px-3 py-2" required />
                                </div>
                                <div>
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <input type="text" id="zipCode" className="w-full border rounded px-3 py-2" required />
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
                                <input type="text" value="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2" className="w-full border rounded px-3 py-2 bg-gray-100" readOnly />
                            </div>
                        )}

                        {paymentMethod === 'ethereum' && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Ethereum Payment</h2>
                                <p className="mb-2">Send the exact amount to the following Ethereum address:</p>
                                <input type="text" value="0x742d35Cc6634C0532925a3b844Bc454e4438f44e" className="w-full border rounded px-3 py-2 bg-gray-100" readOnly />
                            </div>
                        )}

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$4.98</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax</span>
                                <span>$0.50</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>$5.48</span>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-500 rounded-full">Place Order</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}