"use client"
import { useTranslations } from "next-intl";
import TojMarket from "../tojMarket"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Register, SendCode } from "@/api/auth/register";

const RegisterForm = () => {

    const t = useTranslations('register');
    const [seePass, setSeePass] = useState(false)
    const [codeSended, setCodeSended] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [errorCode, setErrorCode] = useState<null | string>(null)
    const { register, handleSubmit } = useForm()

    const Reg = async (data: any) => {
        const result = await Register(data)

        if (result) {
            setError(result)
        }
    }

    const sendCode = async (data: any) => {
        const { email } = data

        const result = await SendCode(email)

        if (!result) {
            setCodeSended(true)
            setErrorCode(null)
        }
        else {
            setErrorCode(result)
        }
    }
    return (
        <form onSubmit={handleSubmit(Reg)} className="w-full sm:w-[30%] flex flex-col gap-[2vh] items-center">
            <TojMarket size={4} />
            <input suppressHydrationWarning={true} {...register("email")} type="email" required placeholder={t("text1")} className="p-[1.2vh_20px] w-full border rounded-md" />
            {!codeSended && errorCode && (<p className="text-[red] w-full text-center">{errorCode}</p>)}
            {codeSended && (
                <div className="flex w-full items-center flex-col gap-[2vh]">
                    <input suppressHydrationWarning={true} {...register("first_name")} type="text" required placeholder={t("text10")} className="p-[1.2vh_20px] w-full border rounded-md" />
                    <input suppressHydrationWarning={true} {...register("last_name")} type="text" required placeholder={t("text11")} className="p-[1.2vh_20px] w-full border rounded-md" />
                    <input suppressHydrationWarning={true} {...register("code")} type="text" required placeholder={t("text9")} className="p-[1.2vh_20px] w-full border rounded-md" />
                    {errorCode && (<p className="text-[red] w-full text-center">{errorCode}</p>)}
                    <button suppressHydrationWarning={true} type="button" className="p-[0.5vh_30px] rounded-md text-white bg-linear-to-br from-[#F7CF4E] to-[#EBB400] w-full font-semibold cursor-pointer" onClick={handleSubmit(sendCode)}>{t("text8")}</button>
                    <div className="flex gap-4 border w-full rounded-md">
                        <input suppressHydrationWarning={true} {...register("password")} type={!seePass ? "password" : "text"} required placeholder={t("text2")} className="p-[1.2vh_20px] rounded-md w-[86%] outline-0" />
                        <button suppressHydrationWarning={true} type="button" className="cursor-pointer" onClick={() => setSeePass(!seePass)}>{seePass ? (<EyeOff />) : (<Eye />)}</button>
                    </div>
                    <button suppressHydrationWarning={true} className="p-[1.2vh_0] rounded-md text-white bg-linear-to-br from-[#F7CF4E] to-[#EBB400] w-full font-semibold cursor-pointer m-[1vh_0]">{t("text6")}</button>
                </div>
            )}
            {!codeSended && (
                <button suppressHydrationWarning={true} type="button" className="p-[1.2vh_0] rounded-md text-white bg-linear-to-br from-[#F7CF4E] to-[#EBB400] w-full font-semibold cursor-pointer m-[1vh_0]" onClick={handleSubmit(sendCode)}>{t("text7")}</button>
            )}
            <div className="flex m-[2vh_0] justify-between items-center w-full">
                <p className="dark:border-white border w-[40%]"></p>
                <p className="font-semibold text-[#E5E5E5] dark:text-white">{t("text3")}</p>
                <p className="dark:border-white border w-[40%]"></p>
            </div>
            {error && (<p className="text-[red] w-full text-center">{error}</p>)}
            <p>{t("text4")} <span onClick={() => window.location.pathname = "/login"} className="text-[#F7CF4E] font-semibold cursor-pointer">{t("text5")}</span></p>
        </form>
    )
}

export default RegisterForm