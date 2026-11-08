'use client'

import Link from "next/link";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { fetchTodos } from "@/data/todos";
import { logout } from "@/data/credential";
import { globalDataContext } from "@/context/globalData";
import { Badge } from "@/components/tailgrids/core/badge";

type Todo = { id: number; title: string; completed: boolean };

// สีของ role (ตัวหนังสือ + พื้นหลังอ่อน)
const ROLE_COLORS: Record<string, string> = {
  admin: 'text-purple-700 bg-purple-100',
  manager: 'text-amber-700 bg-amber-100',
  user: 'text-red-600 bg-red-100',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);

  // โหลดสินค้าครั้งเดียวตอนเปิดเว็บ
  useEffect(() => {
    let cancelled = false

    // ถ้าล้มเหลว (สุ่ม 20%) ให้ลองใหม่อัตโนมัติสูงสุด 5 ครั้ง
    const load = (tries = 0) => {
      fetchProducts()
        .then((data) => { if (!cancelled) setProducts(data) })
        .catch(() => { if (!cancelled && tries < 5) load(tries + 1) })
    }

    load()
    return () => { cancelled = true }
  }, [])

  // โหลด todos ครั้งเดียวตอนเปิดเว็บ (มีใน localStorage ใช้อันนั้น ไม่มีค่อย fetch)
  useEffect(() => {
    const saved: Todo[] = JSON.parse(localStorage.getItem('todosRaw') ?? '[]')
    if (saved.length > 0) {
      setTodos(saved)
      setTodosLoading(false)
    } else {
      fetchTodos()
        .then((data) => setTodos(data as Todo[]))
        .catch(() => setTodos([]))
        .finally(() => setTodosLoading(false))
    }
  }, [])

  // เซฟ todos ทุกครั้งที่เปลี่ยน (หลังโหลดเสร็จ)
  useEffect(() => {
    if (todosLoading) return
    localStorage.setItem('todosRaw', JSON.stringify(todos))
  }, [todos, todosLoading])

  const handleLogout = () => {
    if (!user || loggingOut) return
    setLoggingOut(true)
    logout(user.token)
      .then(() => setUser(null))
      .catch((err) => alert(`error : ${err}`))
      .finally(() => setLoggingOut(false))
  }

  return (
    <globalDataContext.Provider
      value={{ products, setProducts, carts, setCarts, user, setUser, todos, setTodos, todosLoading }}
    >
      <html lang="en">
        <head>
          <title>68100663</title>
        </head>
        <body>
          <Header />

          {/* ข้อมูลผู้ใช้ที่ login (แสดงเมื่อ login แล้วเท่านั้น) */}
          {user && (
            <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                <span className="font-bold text-slate-600">ROLE:</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-bold uppercase ${
                    ROLE_COLORS[user.role] ?? 'text-slate-700 bg-slate-200'
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                <span className="font-bold text-slate-600">NAME:</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 font-bold text-green-700">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                <span className="font-bold text-slate-600">EMAIL:</span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-slate-700">
                  {user.email}
                </span>
              </div>
            </div>
          )}

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

            {/* ปุ่ม LogOut (แสดงเมื่อ login แล้ว) */}
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="cursor-pointer rounded-lg border border-red-400 bg-red-50 px-4 text-sm text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? 'Logging out...' : 'LogOut'}
              </button>
            )}
          </nav>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}