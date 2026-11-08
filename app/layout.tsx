'use client'

import Link from "next/link";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";
import type { Product } from "@/data/products";
import { Badge } from "@/components/tailgrids/core/badge";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  return (
    <globalDataContext.Provider value={{ products, setProducts, carts, setCarts }}>
      <html>
        <body>
          <Header />
          <nav className='mt-3 flex justify-center gap-4 '>
            <Link
              href={'/'}
              className={buttonStyles({
                appearance: pathname === '/' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm'
              })}
            >
              Home
            </Link>
            <Link
              href={'/animation'}
              className={buttonStyles({
                appearance: pathname === '/animation' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm'
              })}
            >
              Animation
            </Link>
            <Link
              href={'/calculator'}
              className={buttonStyles({
                appearance: pathname === '/calculator' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm'
              })}
            >
              Calculator
            </Link>
            <Link
              href={'/todos'}
              className={buttonStyles({
                appearance: pathname === '/todos' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm'
              })}
            >
              Todos
            </Link>
            <Link
              href={'/products'}
              className={buttonStyles({
                appearance: pathname === '/products' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm'
              })}
            >
              Products ({products.length})
            </Link>
            <div className="relative">
            <Link
              href={'/carts'}
              className={buttonStyles({
                appearance: pathname === '/carts' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm'
              })}
            >
              Carts
            </Link>
            <Badge size={'sm'} 
            className='absolute -top-2 -right-2 bg-red-500 text-white'>
              {carts.length}
              </Badge>
            </div>
          </nav>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}