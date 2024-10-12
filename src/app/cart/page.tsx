"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {weiToEth} from '@/functions/wei-to-eth'
import { useRouter } from "next/navigation"
import {toast} from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { removeItem } from '@/redux/cartSlice';


export default function Cart() {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    const router = useRouter()


    const dispatch = useDispatch();

    // Function to remove an item from the cart
    const removeProductToCart = (item) => {
        try {
            dispatch(removeItem(item));
            toast.success('Product removed from cart!')
        } catch (e) {
            toast.error('Something went wrong: ' + e.message)
        }
    };

    return (
        <div className="bg-gray-100">
            <main className="container mx-auto px-6 py-10">
                <Link href="/" className="flex items-center text-green-600 mb-6 w-fit">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Link>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center">
                                            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md mr-4" unoptimized/>
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-gray-600">{weiToEth(item.price)} Eth each</p>
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
                                            <Button variant="outline" size="icon" onClick={() => removeProductToCart(item)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>{weiToEth(subtotal)} Eth</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>{weiToEth(subtotal)} Eth</span>
                                </div>
                            </div>
                                <Button size="lg" className="w-full mt-6 rounded-full bg-green-600 hover:bg-green-500 font-medium" onClick={() => router.push("/checkout")}>Proceed to Checkout</Button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}   