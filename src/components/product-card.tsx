"use client"

import Image from "next/image"
import Link from "next/link"

export default function ProductCard({ product }) {
    const { id, name, description, price, image } = product;

    return (
        <Link href={`/products/${id}`}>
            <div key={id} className="w-full max-w-[250px] rounded-md cursor-pointer overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-[0.5] border">
                <div className="relative overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        className="object-fill w-full h-full transition-transform duration-300 transform hover:scale-[1.025]"
                        width={300}
                        height={200}
                        priority
                    />

                </div>
                <div className="p-2">
                    <h3 className="text-xl font-semibold whitespace-nowrap overflow-hidden line-clamp-1 text-ellipsis">{name}</h3>
                    <p className="text-md text-gray-600 mb-4">{description}</p>
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">{Number(price)} BASE</span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
        
    )
}