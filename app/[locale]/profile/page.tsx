"use client";

import { editProfileName, editProfilePhoto, getTelegramLink, getUser, getUserProfile } from "@/reducers/user/api";
import { RootState } from "@/store/store"
import { Camera, CloudAlert, Copy, Form, Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import toast from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

const Profile = () => {
    const { isLoadingUserProfile, userProfile, isLoadingTegramLink, telegramLink } = useSelector((state: RootState) => state.userInfo)
    const ref = useRef<any>(null)
    const [open, setOpen] = useState(false)
    const t = useTranslations("profile")
    const tt = useTranslations("info")
    const api = process.env.NEXT_PUBLIC_DATA_API
    const dispatch = useDispatch() as any
    const { register, handleSubmit, reset } = useForm()

    const change = (file: File) => {
        const form = new FormData
        form.append("first_name", userProfile?.user_info?.first_name || "")
        form.append("last_name", userProfile?.user_info?.last_name || "")
        form.append("avatar", file)

        dispatch(editProfilePhoto(form))
    }
    const copyTelegramId = async () => {
        try {
            await navigator.clipboard.writeText(userProfile?.user_info?.telegram_id + "" || "")
            toast.success(t("text1"))
        } catch (error) {
            console.error(error)
        }
    }

    const editProfile = (data: any) => {
        const form = new FormData
        form.append("first_name", data.first_name)
        form.append("last_name", data.last_name)

        dispatch(editProfileName(form))
        setOpen(false)
    }

    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getTelegramLink())
    }, [])

    if (isLoadingUserProfile) {
        return (
            <section className="w-full flex flex-col gap-[4vh] items-start">
                <aside className="flex gap-5 items-center">
                    <Skeleton className="w-18 h-18 rounded-full" />
                    <div className="flex flex-col gap-[1vh]">
                        <div className="flex gap-4 items-center">
                            <Skeleton className="w-70 h-[4vh] rounded-md" />
                            <Skeleton className="w-5.5 h-5.5 rounded-md" />
                        </div>
                        <Skeleton className="w-34 h-[3vh] rounded-md" />
                    </div>
                </aside>
                <aside className="p-[3vh_4%] flex flex-col gap-[1vh] rounded-xl bg-[#F7F8F9] dark:bg-[#1E2024] w-full">
                    <Skeleton className="w-30 h-[4vh] rounded-md" />
                    <Skeleton className="w-85 h-[3.5vh] rounded-md" />
                </aside>
            </section>
        )
    }

    if (!isLoadingUserProfile && !userProfile) {
        return <section className="w-full text-[#00000055] dark:text-[#ffffff4e] flex flex-col gap-[4vh] items-center justify-center m-[15vh_0]">
            <CloudAlert size={200} />
            <p className="font-semibold">{tt("text9")}</p>
            <button onClick={() => {
                dispatch(getUserProfile())
                dispatch(getTelegramLink())
            }} className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745bc] text-white p-[1vh_40px] cursor-pointer rounded-md">{tt("text10")}</button>
        </section>
    }

    return (
        <section className="w-full flex flex-col gap-[4vh] items-start">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("text4")}</DialogTitle>
                        <DialogDescription>
                            {t("text5")}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(editProfile)} id="form" className="flex justify-between flex-wrap gap-[1vh]">
                        <input {...register("first_name")} className="p-[1vh_20px] rounded-md w-full sm:w-[48%] border" defaultValue={userProfile?.user_info?.first_name} placeholder={t("text6")} />
                        <input {...register("last_name")} className="p-[1vh_20px] rounded-md w-full sm:w-[48%] border" defaultValue={userProfile?.user_info?.last_name} placeholder={t("text7")} />
                        <div className="w-full flex justify-between sm:justify-start sm:gap-4 items-center mt-[2vh]">
                            <button type="button" onClick={() => {
                                setOpen(false)
                                reset({ last_name: userProfile?.user_info?.last_name, first_name: userProfile?.user_info?.first_name })
                            }} className="w-[48%] p-[1.5vh_0] rounded-md border cursor-pointer">{t("text8")}</button>
                            <button type="submit" form="form" className="w-[48%] p-[1.5vh_0] rounded-md border cursor-pointer transition-all duration-300 bg-[#FFC845] hover:bg-[#ffc745d2] text-white">{t("text9")}</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <input ref={ref} onChange={(e: any) => {
                change(e.target.files[0])
            }} type="file" className="hidden" />
            <aside className="flex gap-5 items-center">
                <button onClick={() => ref.current.click()} className="transition-all duration-500 hover:*:block">
                    <img className="w-18 h-18 rounded-full hover:camera:text-[red] cursor-pointer" draggable={false} src={userProfile && userProfile?.user_info?.avatar != "/media/users_avatars/placeholder.png" ? (api + userProfile?.user_info?.avatar) : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} />
                    <Camera className="transition-all duration-500 fixed -mt-14 ml-4 text-[#ffffffc0] hidden cursor-pointer" size={40} />
                </button>
                <div className="flex flex-col">
                    <div className="flex gap-3 items-center">
                        <p className="text-2xl font-semibold">{userProfile?.user_info?.first_name + " " + userProfile?.user_info?.last_name}</p>
                        <button onClick={() => setOpen(true)} className="cursor-pointer transition-all duration-500 hover:text-[#FFC845]"><Pen size={13} /></button>
                    </div>
                    {userProfile?.user_info?.telegram_id ? (
                        <button onClick={copyTelegramId} className="text-[#FFC845] text-[13px] flex gap-3 items-center cursor-pointer"><Copy size={13} /> {userProfile?.user_info?.telegram_id}</button>
                    ) : isLoadingTegramLink ? (<Skeleton className="w-[70%] h-[3vh] rounded-md" />) : (<a onClick={() => setTimeout(() => {
                        dispatch(getUserProfile())
                        dispatch(getUser())
                    }, 7000)} href={telegramLink} target="_blank" className="text-white p-[0.5vh_10px] rounded-md bg-[#FFC845] transition-all duration-500 hover:bg-[#ffc745c3] w-fit text-[13px]">{t("text2")}</a>)}
                </div>
            </aside>
            <aside className="p-[3vh_4%] flex flex-col gap-[1vh] rounded-xl bg-[#F7F8F9] dark:bg-[#1E2024] w-full">
                <p className="text-[#6E759F]">{t("text3")}</p>
                <p className="font-semibold text-xl">{userProfile?.user_info?.email}</p>
            </aside>
        </section>
    )
}

export default Profile