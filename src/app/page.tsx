"use client"

import ProductList from "@/components/product-list";
import { useAllProductsQuery } from "@/hooks/use-all-products-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import {useAccount} from "wagmi"
export default function Home() {
  const { products, error, isLoading } = useAllProductsQuery()
  const {address}  = useAccount()

  //filter out the products. A seller cannot view his/her own products in featured products, only of other sellers
  const filteredProducts = products.filter((product) => product.farmer !== address)



  return <div className="space-y-5">
    <section className="bg-[url('/farm-product.png')] bg-cover bg-no-repeat w-full text-white h-80 relative grid place-items-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"/>
      <div className="container mx-auto px-6 text-center z-20">
        <h1 className="text-5xl font-bold mb-2">Welcome to FarmBase Market</h1>
        <p className="text-xl mb-8">Discover the best local, organic produce delivered to your doorstep.</p>
        <Button size="lg" variant="secondary"><a href="#featured-products">Shop Now</a></Button>
      </div>
    </section>
    <section id="featured-products" className="container bg-white py-6 px-4 rounded-xl shadow-md space-y-2">
      <h1 className="font-bold text-2xl">Featured Products</h1>
      {error ? <div className="py-6 px-4 rounded-md bg-red-200 text-red-500">{error.message.includes('HTTP request failed') ? 'You seem to be offline. Try reconnecting to the internet to continue shopping.' : error.message}</div> : null}
      {isLoading ? <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <p>Loading...</p>
      </div> : null}
      <ProductList className="flex gap-4 flex-wrap" products={filteredProducts} />
    </section>
  </div>;
}
