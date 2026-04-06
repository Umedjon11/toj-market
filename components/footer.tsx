"use client"

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = () => {
  const t = useTranslations("footer")
  const path = usePathname()

  return (
    <footer className="bg-black absolute z-50 text-white w-full items-start flex flex-wrap gap-[5vh_0] justify-between p-[5vh_5%]">
      <section className="flex w-[48%] sm:w-fit flex-col gap-[1vh]">
        <p className="font-semibold text-xl text-[#FFC845] mb-[2vh]">Toj Market</p>
        <Link onClick={() => window.scrollTo(0, 0)} href="/about" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/about") ? "text-[#F5C70E]" : ""}`}>{t("text5")}</Link>
      </section>
      <section className="flex w-[48%] sm:w-fit flex-col gap-[1vh]">
        <p className="font-semibold text-xl mb-[2vh]">{t("text1")}</p>
        <Link onClick={() => window.scrollTo(0, 0)} href="/" className={`hover:text-[#F5C70E] transition-all duration-300 ${path == "/en" || path == "/ru" || path == "/tj" ? "text-[#F5C70E]" : ""}`}>{t("text6")}</Link>
        <Link onClick={() => window.scrollTo(0, 0)} href="/products" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/products") ? "text-[#F5C70E]" : ""}`}>{t("text2")}</Link>
        <Link onClick={() => window.scrollTo(0, 0)} href="/stores" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/stores") ? "text-[#F5C70E]" : ""}`}>{t("text3")}</Link>
        <Link onClick={() => window.scrollTo(0, 0)} href="/categories" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/categories") ? "text-[#F5C70E]" : ""}`}>{t("text4")}</Link>
      </section>
      <section className="flex w-[48%] sm:w-fit flex-col gap-[1vh]">
        <p className="font-semibold text-xl mb-[2vh]">{t("text8")}</p>
        <Link onClick={() => window.scrollTo(0, 0)} href="/profile" className={`hover:text-[#F5C70E] transition-all duration-300 ${path == "/en/profile" || path == "/ru/profile" || path == "/tj/profile" ? "text-[#F5C70E]" : ""}`}>{t("text7")}</Link>
        <Link onClick={() => window.scrollTo(0, 0)} href="/profile/myshop" className={`hover:text-[#F5C70E] transition-all duration-300 ${path.includes("/profile/myshop") ? "text-[#F5C70E]" : ""}`}>{t("text9")}</Link>
      </section>
      <section className="flex w-[48%] sm:w-fit flex-col gap-[1vh]">
        <p className="font-semibold text-xl mb-[2vh]">{t("text10")}</p>
        <div className="flex gap-7 items-center">
          <Instagram className="cursor-pointer transition-all duration-500 hover:text-[#F5C70E]" />
          <Facebook className="cursor-pointer transition-all duration-500 hover:text-[#F5C70E]" />
          <Twitter className="cursor-pointer transition-all duration-500 hover:text-[#F5C70E]" />
          <Youtube className="cursor-pointer transition-all duration-500 hover:text-[#F5C70E]" />
        </div>
      </section>
      <section className="p-[3vh] rounded-xl border border-white flex flex-col gap-[2vh]">
        <Image
          src={"/Qr.png"}
          alt="Qr"
          width={150}
          height={150}
          draggable={false}
        />
        <p className="text-[#F5C70E]">{t("text11")} Toj Market </p>
      </section>
      <p className="text-[#ffffff2d] w-full gap-2 flex items-center justify-center text-center text-[14px]">@ {t("text12")} <span className="text-[white] cursor-pointer text-[13px] font-semibold">UT platforms</span> 2026</p>
    </footer>
  )
}

export default Footer