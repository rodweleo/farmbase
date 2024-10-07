"use client"

import ProductList from "@/components/product-list";
import { useAllProductsQuery } from "@/hooks/use-all-products-query";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { products, error, isLoading } = useAllProductsQuery()
  return <div>
    <section className="space-y-2">
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
