"use client";

import { getUser } from "@/reducers/user/api";
import { RootState } from "@/store/store";
import { getAccessToken, removeTokens } from "@/utils/axios";
import { ChartBarStacked, ChevronRight, Heart, LogOut, MessageCircle, Plus, Send, ShoppingBag, ShoppingCart, Store, StoreIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { createShop } from "@/reducers/shop/api";
import toast from "react-hot-toast";
import { falseLoading } from "@/reducers/shop/shop";

const SideBar = () => {
    const path = usePathname()
    const t = useTranslations("sideBar")
    const { user, isLoadingUser } = useSelector((state: RootState) => state.userInfo)
    const dispatch = useDispatch() as any
    const token = getAccessToken()
    const api = process.env.NEXT_PUBLIC_DATA_API
    const [open, setOpen] = useState(false)
    const { isLoadingCreateShop } = useSelector((state: RootState) => state.shop)
    const [image, setImage] = useState<null | string>(null)
    const { register, handleSubmit, reset, setValue } = useForm()

    const change = (e: any) => {
        const image = e.target.files[0]
        const reader = new FileReader
        if (image) {
            reader.readAsDataURL(image)

            reader.onload = () => {
                setImage(reader.result + "")
            }
        }
        else {
            setImage(null)
        }

        setValue("avatar", image)
    }

    const submit = async (data: any) => {
        const form = new FormData
        form.append("title", data.title)
        form.append("bio", data.bio)
        form.append("avatar", data.avatar)

        if (!isLoadingCreateShop) {
            const res = await dispatch(createShop(form))
            if (res && res.payload) {
                toast.success(t("text17"))
                dispatch(getUser())
                setOpen(false)
            }
            else {
                toast.error(t("text18"))
                dispatch(falseLoading())
            }
        }
    }

    useEffect(() => {
        dispatch(getUser())
    }, [token])

    return (
        <section className="flex flex-col gap-[2.5vh] w-full sm:w-[25%] text-[14px] sm:sticky sm:top-20 z-30">

            <Dialog open={open} onOpenChange={() => {
                setOpen(false)
                setImage(null)
                reset({ avatar: "", title: "", bio: "" })
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{user?.telegram_id ? t("text8") : t("text10")}</DialogTitle>
                        <DialogDescription>
                            {user?.telegram_id && t("text9")}
                        </DialogDescription>
                        {!isLoadingUser && !user?.telegram_id && (<div className="w-full flex flex-col gap-[2vh] items-center justify-center m-[4vh_0]">
                            <div className="text-[white] p-1 border flex items-center justify-center border-[#27A7E7] bg-[#27A7E7] rounded-full w-20 h-20">
                                <Send size={50} />
                            </div>
                            <p className="text-center text-[#0000009c] dark:text-[#ffffff63]">{t("text11")}</p>
                            <Link onClick={() => setOpen(false)} className="p-[1vh_20px] rounded-md transition-all duration-500 bg-[#27A7E7] hover:bg-[#27a7e7c3] text-white" href={"/profile"}>{t("text12")}</Link>
                        </div>)}
                        {!isLoadingUser && user?.telegram_id && (
                            <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col gap-[2vh]" id="create">
                                <img src={image || "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"} alt="image" width={100} height={100} className="w-30 h-30 border rounded-full m-[0_auto]" />
                                <input onChange={change} required className="p-[1.5vh_20px] rounded-md border cursor-pointer" type="file" />
                                <input form="create" {...register("title")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text13")} />
                                <input form="create" {...register("bio")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text14")} />
                                <div className="flex justify-between flex-wrap gap-y-[1vh]">
                                    <button type="button" onClick={() => {
                                        setOpen(false)
                                        setImage(null)
                                        reset({ avatar: "", title: "", bio: "" })
                                    }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text15")}</button>
                                    <button form="create" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba] ${isLoadingCreateShop ? "bg-[#ffc745ba]" : ""}`}>{isLoadingCreateShop ? t("text19") : t("text16")}</button>
                                </div>
                            </form>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <aside className="flex flex-col gap-[3.5vh] rounded-md bg-[#F7F8F9] dark:bg-[#1E2024] w-full p-[5vh_7%]">
                <Link href={"/profile"} className={`font-semibold transition-all duration-500 hover:text-[#FFC845] flex gap-3 items-center ${path == "/en/profile" || path == "/ru/profile" || path == "/tj/profile" ? "fill-[#F5C70E] stroke-[#F5C70E]" : ""}`}>{!isLoadingUser && (<img className="w-10 h-10 rounded-full cursor-pointer" draggable={false} src={user && user?.avatar != "/media/users_avatars/placeholder.png" ? (api + user?.avatar) : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} />)} {isLoadingUser && (<Skeleton className="w-10 h-10 rounded-full" />)} {!isLoadingUser ? (user?.first_name + " " + user?.last_name) : (<Skeleton className="w-[60%] rounded-md h-[4vh]" />)} <ChevronRight /> </Link>
                <Link href={"/profile/cart"} className={`font-semibold mt-[1vh] sm:mt-[3vh] transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center`}><ShoppingCart className={`transition-all duration-500 ${path.includes("/profile/cart") ? "fill-[#F5C70E] stroke-[#F5C70E]" : "text-[#D1D3D4] dark:text-white"}`} /> {t("text1")}</Link>
                <Link href={"/profile/wish"} className={`font-semibold transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center`}><Heart className={`transition-all duration-500 ${path.includes("/profile/wish") ? "fill-[#F5C70E] stroke-[#F5C70E]" : "text-[#D1D3D4] dark:text-white"}`} /> {t("text2")}</Link>
                <Link href={"/profile/comments"} className={`font-semibold transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center`}><MessageCircle className={`transition-all duration-500 ${path.includes("/profile/comments") ? "fill-[#F5C70E] stroke-[#F5C70E]" : "text-[#D1D3D4] dark:text-white"}`} /> {t("text3")}</Link>
                <Link href={"/profile/myorders"} className={`font-semibold transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center`}><ShoppingBag className={`transition-all duration-500 ${path.includes("/profile/myorders") ? "text-[#F5C70E]" : "text-[#D1D3D4] dark:text-white"}`} /> {t("text6")}</Link>
                {user?.role == "BY" ? (
                    <button onClick={() => setOpen(true)} className="font-semibold transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center cursor-pointer"><StoreIcon className="text-[#D1D3D4] dark:text-white" /> {t("text7")}</button>
                ) : user?.role == "SL" ? (
                    <Link href={"/profile/myshop"} className={`font-semibold transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center`}><Store className={`transition-all duration-500 ${path.includes("/profile/myshop") ? "text-[#F5C70E]" : "text-[#D1D3D4] dark:text-white"}`} /> {t("text5")}</Link>
                ) : user?.role == "AD" ? (
                    <Link href={"/profile/categories"} className={`font-semibold transition-all duration-500 hover:text-[#FFC845] hover:*:text-[#FFC845] flex gap-3 items-center`}><ChartBarStacked className={`transition-all duration-500 ${path.includes("/profile/categories") ? "fill-[#F5C70E] stroke-[#F5C70E]" : "text-[#D1D3D4] dark:text-white"}`} /> {t("text20")}</Link>
                ) : null}
            </aside>
            <button onClick={() => {
                removeTokens()
                window.location.pathname = "/login"
            }} className="cursor-pointer p-[2vh_7%] rounded-md font-semibold text-[red] flex gap-3 items-center bg-[#F7F8F9] dark:bg-[#1E2024]"><LogOut /> {t("text4")}</button>
        </section>
    )
}

export default SideBar