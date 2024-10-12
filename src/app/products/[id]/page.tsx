"use client"

import { useProductQuery } from "@/hooks/use-product-query"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TransactionWrapper from "@/components/transaction-wrapper"
import { encodeFunctionData } from 'viem';
import Link from "next/link"
import { contracts } from '@/contracts';
import { Call } from "@/utils/types"
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import {Button} from "@/components/ui/button"
import { weiToEth } from "@/functions/wei-to-eth"
import {toast} from "react-hot-toast"

export default function Page() {
  const { id } = useParams();
  const { product, error, isLoading } = useProductQuery({ id });

  const { farmer } = product;

  const dispatch = useDispatch();
  // Function to add an item to the cart
  const addProductToCart = (item) => {
    try {
      dispatch(addItem({
        ...item,
        id: Number(item.id),
        stock: Number(item.stock),
        price: Number(item.price),
        farmer: item.farmer as `0x${string}`
      }));
      toast.success('Product added to cart!')
    } catch (e) {
      toast.error('Something went wrong: ' + e.message)
    }
  };


  const encodedSendFundsData = encodeFunctionData({
    abi: contracts[2].abi,
    functionName: 'sendFunds',
    args: [farmer.length > 0 ? farmer : "0xd015b10d9dff563a393158e0765aef22d823f7c9"]
  })
  const calls: Call[] = [
    {
      to: contracts[2].address,
      data: encodedSendFundsData,
      value: BigInt(Number(product.price))
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
    <div>
      <main className="container mx-auto px-6 py-10">
        <Link
          href="/"
          className="flex items-center mb-6 text-[#4CAF50] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>

        <section className="bg-white rounded-lg shadow-md p-6  grid grid-cols-2 place-items-stretch sm:grid-cols-2 gap-12">
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={500}
            className="rounded-xl shadow-md w-full cursor-pointer transition-transform transform hover:scale-[1.005]"
            unoptimized
          />

          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <h1 className="font-bold text-2xl lg:text-4xl text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-md lg:text-xl text-slate-400">{product.description}</p>
              <h2 className="text-xl lg:text-2xl font-bold text-green-600">
                {weiToEth(product.price)} ETH
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
                    <h3 className="font-semibold text-slate-800 text-wrap overflow-clip">{product.farmer}</h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>
                        {seller.rating} • {seller.sales.toLocaleString()} sales
                      </span>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            <div className="flex items-center gap-10">
              <TransactionWrapper calls={calls} text="Buy Now" />
              <Button variant="outline" type="button" title="Add to Cart" className="group flex items-center justify-center gap-2 rounded-full text-slate-500 px-6 py-2 transition-all duration-300 hover:bg-[#388e3c] hover:text-white w-full" onClick={() => addProductToCart(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                <span className=" hover:text-white">
                  Add to cart
                </span>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )

}