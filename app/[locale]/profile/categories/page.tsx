"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { addNewCategory, deleteCategory, editCategory, getCategories } from "@/reducers/categories/api"
import { ICategory } from "@/reducers/categories/categories"
import { getUser } from "@/reducers/user/api"
import { RootState } from "@/store/store"
import { Ban, Pen, Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

const Categories = () => {
    const t = useTranslations("categories")
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [image, setImage] = useState<any>(null)
    const [choosedImage, setChoosedImage] = useState<null | string>(null)
    const { categories, isLoading } = useSelector((state: RootState) => state.categories)
    const dispatch = useDispatch() as any
    const { user, isLoadingUser } = useSelector((state: RootState) => state.userInfo)
    const { register, handleSubmit, reset, setValue } = useForm()

    const change = (e: any) => {
        if (e.target.files) {
            const imagee = e.target.files[0]
            const reader = new FileReader
            reader.readAsDataURL(imagee)

            reader.onload = () => {
                setChoosedImage(reader.result + "")
            }
            setImage(imagee)
        }
    }

    const add = async (data: any) => {
        const form = new FormData
        form.append("title", data.title)
        form.append("avatar", image)

        const res = await dispatch(addNewCategory(form))
        if (res.payload.status == 201) {
            toast.success(t("text7"))
            reset({ title: "" })
            setImage(null)
            setChoosedImage(null)
            setOpen(false)
        }
        else {
            toast.error(t("text8"))
        }
    }

    const edit = async (data: any) => {
        const form = new FormData
        form.append("title", data.title)
        form.append("avatar", image)

        const res = await dispatch(editCategory({ id:data.id, category: form }))
        if (res.payload.status == 200) {
            toast.success(t("text7"))
            reset({ title: "", id: "" })
            setImage(null)
            setChoosedImage(null)
            setOpenEdit(false)
        }
        else {
            toast.error(t("text8"))
        }
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getUser())
    }, [])

    if (!isLoadingUser && user && user.role != "AD") {
        return <section className="flex flex-col  text-[#00000044] dark:text-[#ffffff49] gap-[2vh] w-full items-center justify-center m-[10vh_0]">
            <Ban size={170} />
            <p>{t("text10")}</p>
            <Link href="/profile" className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745be] w-fit text-white p-[1vh_25px] cursor-pointer rounded-md">{t('text11')}</Link>
        </section>
    }

    return (
        <section className="w-full flex flex-col gap-[4vh] items-start">

            <Dialog open={open} onOpenChange={() => {
                setOpen(false)
                setImage(null)
                setChoosedImage(null)
                reset({ title: "" })
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("text3")}</DialogTitle>
                        <DialogDescription>
                            {t("text4")}
                        </DialogDescription>
                        <form onSubmit={handleSubmit(add)} className="w-full flex flex-col gap-[2vh]" id="add">
                            <img
                                src={choosedImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdpU431xPGZoWC2RW7DAlWe29mnpo2z5m13Q&s"}
                                width={100}
                                height={100}
                                alt="category image"
                                draggable={false}
                                className="w-50 h-50 m-[0_auto] rounded-xl"
                            />
                            <input onChange={change} form="add" type="file" required className="p-[1.5vh_20px] rounded-md border" />
                            <input form="add" {...register("title")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text12")} />
                            <div className="flex justify-between flex-wrap gap-y-[1vh]">
                                <button type="button" onClick={() => {
                                    setOpen(false)
                                    setImage(null)
                                    setChoosedImage(null)
                                    reset({ title: "" })
                                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text13")}</button>
                                <button form="add" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text14")}</button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog open={openEdit} onOpenChange={() => {
                setOpenEdit(false)
                setImage(null)
                setChoosedImage(null)
                reset({ title: "", id: "" })
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("text5")}</DialogTitle>
                        <DialogDescription>
                            {t("text6")}
                        </DialogDescription>
                        <form onSubmit={handleSubmit(edit)} className="w-full flex flex-col gap-[2vh]" id="add">
                            <img
                                src={choosedImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdpU431xPGZoWC2RW7DAlWe29mnpo2z5m13Q&s"}
                                width={100}
                                height={100}
                                alt="category image"
                                draggable={false}
                                className="w-50 h-50 m-[0_auto] rounded-xl"
                            />
                            <input onChange={change} form="add" type="file" required className="p-[1.5vh_20px] rounded-md border" />
                            <input form="add" {...register("title")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text12")} />
                            <div className="flex justify-between flex-wrap gap-y-[1vh]">
                                <button type="button" onClick={() => {
                                    setOpenEdit(false)
                                    setImage(null)
                                    setChoosedImage(null)
                                    reset({ title: "", id: "" })
                                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text13")}</button>
                                <button form="add" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text14")}</button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <aside className="flex gap-4 items-center">
                <h2 className="font-semibold text-2xl flex gap-1">{t("text1")} <span className="text-[13px] font-medium">{categories ? categories.length : 0}</span></h2>
                <button onClick={() => setOpen(true)} className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745be] w-fit text-white p-[1vh_25px] cursor-pointer rounded-md">{t("text2")}</button>
            </aside>
            <aside className="flex flex-wrap gap-[3vh_2%] bg-[#F7F8F9] dark:bg-[#1E2024] w-full p-[4vh_8%] sm:p-[4vh_3%] rounded-xl">
                {
                    categories.map((category: ICategory) => {
                        return <div key={category.id} className="flex p-[2vh] rounded-xl flex-col gap-[2vh] w-[48%] sm:w-[23%] border">
                            <div className="bg-[#F7F8F9] flex p-[1vh] items-center justify-center rounded-xl w-full h-[20vh]">
                                <img
                                    src={category.avatar}
                                    alt={category.title}
                                    width={100}
                                    height={100}
                                    draggable={false}
                                    className="w-fit h-fit max-w-[99%] max-h-[18vh] rounded-xl"
                                />
                            </div>
                            <p>{category.title}</p>
                            <div className="flex gap-4 items-center">
                                <Trash onClick={() => dispatch(deleteCategory(category.id))} className="transition-all duration-500 text-[#FF4444] hover:text-[#ff4444cb] cursor-pointer" />
                                <Pen onClick={() => {
                                    setOpenEdit(true)
                                    setValue("title", category.title)
                                    setValue("id", category.id)
                                    setChoosedImage(category.avatar)
                                }} className="transition-all duration-500 text-[#FFC845] hover:text-[#ffc745be] cursor-pointer" />
                            </div>
                        </div>
                    })
                }
            </aside>
        </section>
    )
}

export default Categories