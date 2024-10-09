"use client"

import ProductList from "@/components/product-list";
import { useAllProductsQuery } from "@/hooks/use-all-products-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"

export default function Home() {
  const { products, error, isLoading } = useAllProductsQuery()
  return <div className="space-y-5">
    <section className="bg-[url('/farm-product.png')] bg-cover bg-no-repeat w-full text-white h-80 relative grid place-items-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"/>
      <div className="container mx-auto px-6 text-center z-20">
        <h1 className="text-5xl font-bold mb-2">Welcome to FarmBase Market</h1>
        <p className="text-xl mb-8">Discover the best local, organic produce delivered to your doorstep.</p>
        <Button size="lg" variant="secondary">Shop Now</Button>
      </div>
    </section>
    <section className="container space-y-2">
      <h1 className="font-bold text-2xl">Featured Products</h1>
      {error ? `Something went wrong: ${error}` : null}
      {isLoading ? <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <p>Loading...</p>
      </div> : null}
      <ProductList className="flex gap-4 flex-wrap" products={products} />
    </section>
  </div>;
}
