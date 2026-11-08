'use client'

import Image from "next/image";
import { useContext } from "react";
import type { Product } from "@/data/products";
import { globalDataContext } from "@/context/globalData";

export default function Page() {
    const { products, carts, setCarts, setProducts } = useContext(globalDataContext)

    const addToCart = (product: Product) => {
        setProducts(products.filter((p: Product) => p.id !== product.id))
        setCarts([...carts, product])
    }

    return (
        <div className="mt-4 bg-cyan-50 w-3xl mx-auto h-100 border border-gray-300 overflow-auto p-2">
            <div className="grid grid-cols-5 gap-2">
                {products?.map((product: Product) => (
                    <div
                        key={product.id}
                        className="relative aspect-square overflow-hidden rounded bg-white shadow-sm flex flex-col justify-between"
                    >
                        {/* รูปภาพสินค้า */}
                        <Image
                            src={product.thumbnailUrl}
                            alt={product.title}
                            width={200}
                            height={200}
                            unoptimized
                            className="absolute inset-0 size-full object-cover"
                        />

                        {/* ป้ายราคา มุมขวาบน */}
                        <div className="absolute top-1.5 right-1.5 bg-black/60 px-1.5 py-0.5 rounded text-xs font-bold text-white z-10">
                            ${product.price}
                        </div>

                        {/* ชื่อสินค้า ด้านล่าง ปรับให้ลงมาชิดปุ่มพอดี */}
                        <div className="absolute inset-x-0 bottom-[31px] bg-black/60 px-1 py-1 text-left text-xs leading-tight font-bold text-white line-clamp-2 z-10">
                            {product.title}
                        </div>

                        {/* ปุ่ม Add to Carts */}
                        <button
                            onClick={() => addToCart(product)}
                            className="relative z-10 mt-auto w-full bg-green-500 hover:bg-blue-600 text-white text-xs font-bold py-2 transition-colors duration-200 cursor-pointer"
                        >
                            Add to Carts
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}