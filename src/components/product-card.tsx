"use client";

import Image from "next/image";
import Link from "next/link";
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import { weiToEth } from "@/functions/wei-to-eth";

type ProductProps = {
  id: number | string,
  name: string,
  description: string,
  price: bigint,
  image: string
}
export default function ProductCard({ product }: {
  product: ProductProps
}) {
  const { id, name, description, price, image } = product;

    const dispatch = useDispatch();

  // Function to add an item to the cart
  const addProductToCart = (item) => {
    try{
      dispatch(addItem({
        ...item, 
        id: Number(item.id),
        stock: Number(item.stock),
        price: Number(item.price),
        farmer: item.farmer as `0x${string}`
      }));
      toast.success('Product added to cart!')
    }catch(e){
      toast.error('Something went wrong: '+ e.message)
    }
  };
  return (
    
      <div key={id} className="mt-4">
        <div className="relative mb-4 h-[250px]">
          <Image
            src={image}
            alt={name}
            className="rounded-xl object-cover w-full h-full"
            width={300}
            height={250}
            unoptimized
          />

        <button type="button" title="Add to Cart" className="group absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center gap-2 rounded-full border border-transparent bg-[#4caf50] px-6 py-2 text-white transition-all duration-300 hover:bg-white lg:w-[150px] md:w-[150px]" onClick={() => addProductToCart(product)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-plus text-white transition-colors duration-300 group-hover:text-lime-400"
              viewBox="0 0 16 16"
            >
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <span className="text-white transition-colors duration-300 group-hover:text-[#4caf50]  text-sm">
              Add to cart
            </span>
          </button>
        </div>
      <Link href={`/products/${id}`}>
        <div className="mt-5">
          <h3 className="text-xl font-semibold whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className="text-md text-slate-500">{description}</p>
          <span className="text-lg font-bold text-[#4CAF50]">
            {weiToEth(Number(price))} Eth
          </span>
        </div>
      </Link>
      </div>
    
  );
}
