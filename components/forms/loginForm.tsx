"use client"
import { useTranslations } from "next-intl";
import TojMarket from "../tojMarket"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { logIn } from "@/api/auth/login";

const LoginForm = () => {

  const t = useTranslations('login');
  const [seePass, setSeePass] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const { register, handleSubmit } = useForm()

  const Log = async (data: any) => {
    const result = await logIn(data)
    
    if (result) {
      setError(result)
    }
  }
  return (
    <form onSubmit={handleSubmit(Log)} className="w-full sm:w-[30%] flex flex-col gap-[2vh] items-center">
      <TojMarket size={4} />
      <input suppressHydrationWarning={true} {...register("email")} type="email" required placeholder={t("text1")} className="p-[1.2vh_20px] w-full border rounded-md" />
      <div className="flex gap-4 border w-full rounded-md">
        <input suppressHydrationWarning={true} {...register("password")} type={!seePass ? "password" : "text"} required placeholder={t("text2")} className="p-[1.2vh_20px] rounded-md w-[86%] outline-0" />
        <button suppressHydrationWarning={true} type="button" className="cursor-pointer" onClick={() => setSeePass(!seePass)}>{seePass ? (<EyeOff />) : (<Eye />)}</button>
      </div>
      <button suppressHydrationWarning={true} className="p-[1.2vh_0] rounded-md text-white bg-linear-to-br from-[#F7CF4E] to-[#EBB400] w-full font-semibold cursor-pointer m-[1vh_0]">{t("text6")}</button>
      <div className="flex m-[2vh_0] justify-between items-center w-full">
        <p className="dark:border-white border w-[40%]"></p>
        <p className="font-semibold text-[#E5E5E5] dark:text-white">{t("text3")}</p>
        <p className="dark:border-white border w-[40%]"></p>
      </div>
      {error && (<p className="text-[red] w-full text-center">{error}</p>)}
      <p>{t("text4")} <span onClick={() => window.location.pathname = "/register"} className="text-[#F7CF4E] font-semibold cursor-pointer">{t("text5")}</span></p>
    </form>
  )
}

export default LoginForm