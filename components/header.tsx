"use client"
import { Heart, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { getAccessToken, removeTokens } from "@/utils/axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { getCartProducts } from "@/reducers/cart/api"
import { getUser } from "@/reducers/user/api"
import { Skeleton } from "./ui/skeleton"

import { Menu } from "lucide-react"; // Иконки
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

const Header = () => {
  const path = usePathname()
  const api = process.env.NEXT_PUBLIC_DATA_API
  const t = useTranslations("navbar")
  const { user, isLoadingUser } = useSelector((state: RootState) => state.userInfo)
  const { cartProducts } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch() as any
  const token = getAccessToken()

  useEffect(() => {
    //dispatch(getCartProducts())
  }, [])
  useEffect(() => {
    //dispatch(getUser())
  }, [token])

  return (
    <nav className="sticky mb-2 z-100 p-[1.5vh_2%] w-full sm:w-[98%] sm:ml-[1%] rounded-none sm:rounded-full dark:text-white mt-0 sm:mt-3 top-0 sm:top-3 backdrop-blur-lg font-main transition-all duration-300 flex justify-between items-center shadow-sm sm:shadow-none">
      <div className="flex items-center gap-4">
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 outline-none">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-100 z-400 dark:bg-black">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle></SheetTitle>
              </SheetHeader>

              <div className="flex flex-col m-[0_30px] gap-6 mt-8 text-lg">
                <Link href="/" className={`hover:text-[#F5C70E] transition-all duration-300 ${path === "/en" || path === "/ru" || path === "/tj" ? "text-[#F5C70E]" : ""}`}>{t("text6")}</Link>
                <Link href="/products" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/products") ? "text-[#F5C70E]" : ""}`}>{t("text7")}</Link>
                <Link href="/about" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/about") ? "text-[#F5C70E]" : ""}`}>{t("text8")}</Link>
                <Link href="/stores" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/stores") ? "text-[#F5C70E]" : ""}`}>{t("text9")}</Link>

                <hr className="opacity-20" />

              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Image
          onClick={() => window.location.pathname = "/"}
          draggable={false}
          src="/logo.png"
          alt="logo"
          className="w-20 h-7 sm:w-23 sm:h-8 cursor-pointer"
          width={150}
          height={100}
        />
      </div>
      <div className="hidden sm:flex gap-8 items-center">
        <Link href="/" className={`hover:text-[#F5C70E] px-2 pb-1 transition-all duration-300 hover:border-b-2 border-[#F5C70E] ${path === "/en" || path === "/ru" || path === "/tj" ? "text-[#F5C70E] border-b-2" : ""}`}>{t("text6")}</Link>
        <Link href="/products" className={`hover:text-[#F5C70E] px-2 pb-1 transition-all duration-300 hover:border-b-2 border-[#F5C70E] ${path.includes("/products") ? "text-[#F5C70E] border-b-2" : ""}`}>{t("text7")}</Link>
        <Link href="/about" className={`hover:text-[#F5C70E] px-2 pb-1 transition-all duration-300 hover:border-b-2 border-[#F5C70E] ${path.includes("/about") ? "text-[#F5C70E] border-b-2" : ""}`}>{t("text8")}</Link>
        <Link href="/stores" className={`hover:text-[#F5C70E] px-2 pb-1 transition-all duration-300 hover:border-b-2 border-[#F5C70E] ${path.includes("/stores") ? "text-[#F5C70E] border-b-2" : ""}`}>{t("text9")}</Link>
      </div>
      <div className="flex gap-3 sm:gap-4 items-center">
        <select
          suppressHydrationWarning
          onChange={(e) => window.location.pathname = `/${e.target.value}/${path.slice(4)}`}
          value={path.slice(1, 3)}
          className="p-1 sm:p-2 text-sm bg-transparent border rounded-md dark:bg-black  outline-none"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="tj">TJ</option>
        </select>
        <Link href="/profile/wish" className="hidden sm:block hover:text-[#FF4444] transition-all">
          <Heart className={path.includes("/profile/wish") ? "fill-[#F5C70E] stroke-[#F5C70E]" : ""} />
        </Link>
        <Link href="/profile/cart" className="relative p-1">
          <ShoppingCart className={`hover:text-[#F5C70E] transition-all ${path.includes("/profile/cart") ? "fill-[#F5C70E] stroke-[#F5C70E]" : ""}`} />
          {cartProducts.length > 0 && (
            <span className="absolute -top-px -right-1 bg-[#F1BB49] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartProducts.length < 10 ? cartProducts.length : "9+"}
            </span>
          )}
        </Link>

        <AnimatedThemeToggler />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <img
                src={user.avatar !== "/media/users_avatars/placeholder.png" ? api + user.avatar : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                className="w-8 h-8 sm:w-9 sm:h-9 border rounded-full object-cover"
                alt="user"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-200">
              <DropdownMenuLabel>{t("text1")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => window.location.pathname = "/profile"}>{t("text2")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={() => {
                removeTokens()
                window.location.pathname = "/login"
              }}>{t("text3")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : !user ? (
          <Link href="/login" className="text-sm font-semibold hover:text-[#F5C70E]">{t("text4")}</Link>
        ) : null}
      </div>
    </nav>
  )
}

export default Header