'use client'

import Image from "next/image";
import { useContext } from "react";
import type { Product } from "@/data/products";
import { globalDataContext } from "@/context/globalData";

export default function Page() {
    const { carts, setCarts, setProducts } = useContext(globalDataContext)

    // เอาออกจากตะกร้า แล้วคืนกลับไปหน้า Products (เรียงตาม id เหมือนเดิม)
    const removeFromCart = (product: Product) => {
        setCarts((prev: Product[]) => prev.filter((p) => p.id !== product.id))
        setProducts((prev: Product[]) =>
            [...prev, product].sort((a, b) => a.id - b.id)
        )
    }

    const total = carts.reduce((sum: number, p: Product) => sum + p.price, 0)

    return (
        <div className="mt-4 bg-cyan-50 w-3xl mx-auto h-100 border border-gray-300 overflow-auto p-2">
            {/* สรุปตะกร้า */}
            <div className="mb-2 flex justify-between text-sm font-bold text-slate-700">
                <span>{carts.length} items</span>
                <span>Total: ${total.toFixed(2)}</span>
            </div>

            {carts.length === 0 && (
                <div className="mt-10 text-center text-slate-500">
                    Your cart is empty
                </div>
            )}

            <div className="grid grid-cols-5 gap-2">
                {carts.map((product: Product) => (
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

                        {/* ชื่อสินค้า ด้านล่าง ชิดปุ่ม */}
                        <div className="absolute inset-x-0 bottom-[33px] bg-black/60 px-1 py-1 text-left text-xs leading-tight font-bold text-white line-clamp-2 z-10">
                            {product.title}
                        </div>

                        {/* ปุ่ม Remove */}
                        <button
                            onClick={() => removeFromCart(product)}
                            className="relative z-10 mt-auto w-full bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 transition-colors duration-200 cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}