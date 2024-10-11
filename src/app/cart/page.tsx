import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CheckoutBtn from '@/components/checkout-btn'

// Mock cart data (in a real app, this would come from a state management solution like Redux or React Context)
const cartItems = [
    { id: 1, name: "Fresh Apples", price: 2.99, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Organic Carrots", price: 1.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
]

export default function Cart() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal + tax

    return (
        <div className="bg-gray-100">
            <main className="container mx-auto px-6 py-10">
                <Link href="/" className="flex items-center text-green-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Link>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center">
                                            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md mr-4" />
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                title="quantity"
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                className="border rounded px-2 py-1 w-16 mr-4"
                                            />
                                            <Button variant="outline" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                                <CheckoutBtn/>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}   