"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { addToCart } from "@/reducers/cart/api";
import { setCategryId } from "@/reducers/filter/filter";
import { addCommentToProudct, addRaitingToProudct, getCommentsById, getProductById } from "@/reducers/products/api";
import { IComment, IImage } from "@/reducers/products/products";
import { RootState } from "@/store/store";
import { CloudAlert, Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () => {
    const { id } = useParams()
    const { isLoadingProduct, isLoadingCommentsById, productById, commentsById } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch() as any
    const [selectedImage, setSelectedImage] = useState<null | string>(null)
    const [part, setPart] = useState("description")
    const t = useTranslations("info")
    const { register, reset, handleSubmit } = useForm()

    const addComment = async (data: any) => {
        const form = new FormData
        form.append("product", productById?.id ? productById?.id + "" : 0 + "")
        form.append("text", data.comment)
        const form1 = new FormData
        form1.append("crowns", data.raiting)
        console.log(data)

        const res1 = await dispatch(addCommentToProudct({ id: productById?.id || 0, comment: form }))
        const res2 = await dispatch(addRaitingToProudct({ id: productById?.id || 0, raiting: form1 }))
        if (res1.payload && res2.payload) {
            toast.success(t("text14"))
            reset({ comment: "", raiting: 1 })
        }
        else {
            toast.error(t("text15"))
        }
    }

    useEffect(() => {
        dispatch(getProductById(id))
        dispatch(getCommentsById(id))
    }, [])

    if (isLoadingProduct) {
        return <main className="flex flex-col pb-[15vh] gap-[5vh] items-start w-[95%] m-[0_auto] bg-[#F7F8F9] dark:bg-black">
            <section className="flex justify-between p-[2vh_3%] sm:p-[4vh_1%] bg-white rounded-md dark:bg-[#1E2024] flex-col gap-y-[3vh] sm:flex-row w-full items-start">
                <aside className="flex gap-4 sm:flex-row flex-col-reverse w-full sm:w-fit items-start">
                    <div className="w-full scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:w-35 sm:max-w-35 sm:h-[55vh] sm:max-h-[60vh] flex sm:flex-col gap-[1vh] rounded-md p-[1vh] overflow-x-auto sm:overflow-y-auto">
                        <Skeleton className="w-30 h-[17vh] min-h-[17vh] min-w-30 max-w-30 max-h-[17vh] rounded-md" />
                        <Skeleton className="w-30 h-[17vh] min-h-[17vh] min-w-30 max-w-30 max-h-[17vh] rounded-md" />
                        <Skeleton className="w-30 h-[17vh] min-h-[17vh] min-w-30 max-w-30 max-h-[17vh] rounded-md" />
                    </div>
                    <Skeleton className="w-full sm:w-110 h-[60vh] p-[2vh_0.5%] rounded-md" />
                </aside>
                <aside className="flex w-full sm:w-[32%] flex-col gap-[2vh]">
                    <div className="flex flex-col gap-[3.5vh] w-full bg-white dark:bg-[#1E2024] rounded-md p-[5vh_5%]">
                        <div className={`flex items-center gap-3`}>
                            <p className="text-[rgb(110,110,115)] dark:text-[#6E6E6E] w-fit">{t("text1")}</p>
                            <p className={`w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden`}>.....................................................................................................................................................................................................................</p>
                            <Skeleton className="w-[50%] rounded-md h-[4vh]" />
                        </div>
                        <div className={`flex items-center gap-3`}>
                            <p className="text-[rgb(110,110,115)] dark:text-[#6E6E6E] w-fit">{t("text6")}</p>
                            <p className={`w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden`}>.....................................................................................................................................................................................................................</p>
                            <Skeleton className="w-[80%] rounded-md h-[4vh]" />
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-[#6E6E73] dark:text-[#6E6E6E] w-fit">{t("text3")}</p>
                            <p className="w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden">.....................................................................................................................................................................................................................</p>
                            <Skeleton className="w-[80%] rounded-md h-[4vh]" />
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-[#6E6E73] dark:text-[#6E6E6E] w-fit">{t("text2")}</p>
                            <p className="w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden">.....................................................................................................................................................................................................................</p>
                            <Skeleton className="w-[80%] rounded-md h-[4vh]" />
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-[rgb(110,110,115)] dark:text-[#6E6E6E] w-fit">{t("text5")}</p>
                            <p className="w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden">.....................................................................................................................................................................................................................</p>
                            <Skeleton className="w-[20%] rounded-md h-[4vh]" />
                        </div>
                    </div>
                </aside>
                <aside className="bg-[#f7f8f953] dark:bg-[#2F3135] p-[2vh_3%] sm:p-[2vh_1%] flex flex-col gap-[2vh] sm:gap-[4vh] w-full sm:w-[30%] rounded-md">
                    <div className="flex flex-col gap-[3vh] mt-[3vh]">
                        <div className="flex gap-4 flex-wrap gap-y-[1vh] items-center">
                            <Skeleton className="w-[36%] rounded-md h-[4vh]" />
                            <Skeleton className="w-[15%] rounded-md h-[4vh]" />
                            <Skeleton className="w-[36%] rounded-md h-[4vh]" />
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        <Skeleton className="w-11 rounded-md h-11" />
                        <Skeleton className="w-11 rounded-md h-11" />
                        <Skeleton className="w-[68%] rounded-md h-11" />
                    </div>
                </aside>
            </section>
            <section className="flex flex-col gap-[3vh] p-[2vh_3%] sm:p-[2vh_2%] rounded-md bg-white dark:bg-[#1E2024] w-full">
                <aside className="flex gap-4">
                    <Skeleton className="w-30 rounded-md h-7" />
                    <Skeleton className="w-30 rounded-md h-7" />
                </aside>
                <Skeleton className="w-full rounded-md h-40" />
            </section>
        </main>
    }

    if (!isLoadingProduct && !productById) {
        return <main className="flex flex-col pb-[15vh] text-[#00000055] dark:text-[#ffffff4e] gap-[2vh] w-full min-h-[85vh] items-center justify-center">
            <CloudAlert size={200} />
            <p className="font-semibold">{t("text9")}</p>
            <button onClick={() => {
                dispatch(getProductById(id))
                dispatch(getCommentsById(id))
            }} className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745bc] text-white p-[1vh_40px] cursor-pointer rounded-md">{t("text10")}</button>
        </main>
    }

    return (
        <main className="flex flex-col pb-[15vh] gap-[5vh] items-start w-[95%] m-[0_auto] bg-[#F7F8F9] dark:bg-black">
            <section className="flex justify-between p-[2vh_3%] sm:p-[4vh_1%] bg-white rounded-md dark:bg-[#1E2024] flex-col gap-y-[3vh] sm:flex-row w-full items-start">
                <aside className="flex gap-4 sm:flex-row flex-col-reverse w-full sm:w-fit items-start">
                    <div className="w-full scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:w-35 sm:max-w-35 sm:h-[55vh] sm:max-h-[60vh] flex sm:flex-col gap-[1vh] rounded-md p-[1vh] overflow-x-auto sm:overflow-y-auto">
                        {
                            productById ? productById?.images?.map((image: IImage) => {
                                return <button onClick={() => setSelectedImage(image.image)} key={image.id} className={`bg-[#F7F8F9] flex justify-center items-center w-30 h-[17vh] min-h-[17vh] min-w-30 max-w-30 max-h-[17vh] p-[1vh_1%] cursor-pointer transition-all duration-500 ${selectedImage == image.image ? "border-2 border-[#FFC845]" : "hover:border-2 hover:border-[#8080805a]"} rounded-md`}>
                                    <img
                                        src={image.image}
                                        alt="image"
                                        width={20}
                                        height={20}
                                        draggable={false}
                                        className="w-fit h-fit max-w-[98%] m-auto max-h-[14vh] rounded-xl"
                                    />
                                </button>
                            })
                                : null}
                    </div>
                    <div className={`bg-[#F7F8F9] flex items-center justify-center w-full sm:w-110 h-[60vh] p-[2vh_0.5%] cursor-pointer rounded-md`}>
                        <img
                            src={selectedImage ? selectedImage : productById?.images?.find((image: IImage) => image.is_main_image)?.image}
                            alt="image"
                            width={20}
                            height={20}
                            draggable={false}
                            className="w-fit h-fit max-w-[99%] max-h-[56vh] rounded-xl"
                        />
                    </div>
                </aside>
                <aside className="flex w-full sm:w-[32%] flex-col gap-[2vh]">
                    <div className="flex flex-col gap-[3.5vh] w-full bg-white dark:bg-[#1E2024] rounded-md p-[5vh_5%]">
                        <div className={`flex items-center ${productById && productById?.title?.length >= 10 ? "justify-between" : "gap-3"}`}>
                            <p className="text-[rgb(110,110,115)] dark:text-[#6E6E6E] w-fit">{t("text1")}</p>
                            <p className={`${productById && productById?.title?.length >= 10 ? "w-[30%] sm:w-[46%]" : "w-full"} text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden`}>.....................................................................................................................................................................................................................</p>
                            <p className="font-semibold">{productById?.title}</p>
                        </div>
                        <div className={`flex items-center gap-3`}>
                            <p className="text-[rgb(110,110,115)] dark:text-[#6E6E6E] w-fit">{t("text6")}</p>
                            <p className={`w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden`}>.....................................................................................................................................................................................................................</p>
                            <p className="line-clamp-1">{productById?.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-[#6E6E73] dark:text-[#6E6E6E] w-fit">{t("text3")}</p>
                            <p className="w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden">.....................................................................................................................................................................................................................</p>
                            <Link href={"/products"} onClick={() => dispatch(setCategryId(productById?.category_info?.id))} className="w-fit font-semibold text-[#336BFD]">{productById?.category_info?.title}</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-[#6E6E73] dark:text-[#6E6E6E] w-fit">{t("text2")}</p>
                            <p className="w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden">.....................................................................................................................................................................................................................</p>
                            <Link href={`/stores/${productById?.shop_info?.id}`} className="w-fit font-semibold text-[#336BFD]">{productById?.shop_info?.title}</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-[rgb(110,110,115)] dark:text-[#6E6E6E] w-fit">{t("text5")}</p>
                            <p className="w-full text-[#6E6E73] dark:text-[#6E6E6E] overflow-hidden">.....................................................................................................................................................................................................................</p>
                            <p className="font-semibold">{productById?.views_count}</p>
                        </div>
                    </div>
                </aside>
                <aside className="bg-[#F7F8F9] dark:bg-[#2F3135] p-[2vh_3%] sm:p-[2vh_1%] flex flex-col gap-[2vh] sm:gap-[4vh] w-full sm:w-[30%] rounded-md">
                    <div className="flex flex-col gap-[3vh] mt-[3vh]">
                        <div className="flex gap-4 flex-wrap gap-y-[1vh] items-center">
                            {productById && +productById?.discount > 0 && (<p className={`text-xl font-semibold`}>{(+productById?.price / 100 * (100 - +productById?.discount)).toFixed(2)} c</p>)}
                            {productById && +productById?.discount > 0 && (<p className="bg-[red] text-white font-semibold p-[0.5vh_8px] rounded-md">-{productById?.discount}%</p>)}
                            <p className={`text-xl ${productById && +productById?.discount > 0 ? "line-through" : "font-semibold"}`}>{productById?.price} c</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        <button onClick={() => dispatch(addToCart(productById ? productById?.id : 1))} className="bg-white text-black cursor-pointer p-[2vh] sm:p-[1.2vh] rounded-md"><ShoppingCart /></button>
                        <button className="bg-white text-[red] cursor-pointer p-[2vh] sm:p-[1.2vh] rounded-md"><Heart /></button>
                        <button onClick={() => {
                            dispatch(addToCart(productById ? productById?.id : 1))
                            window.location.pathname = "/design"
                        }} className="bg-[#FFC845] transition-all duration-500 hover:bg-[#ffc745db] text-white font-semibold cursor-pointer p-[2vh_0] sm:p-[1.2vh_0] rounded-md w-[60%] sm:w-[70%]">{t("text4")}</button>
                    </div>
                </aside>
            </section>
            <section className="flex flex-col gap-[3vh] p-[2vh_3%] sm:p-[2vh_2%] rounded-md bg-white dark:bg-[#1E2024] w-full">
                <aside className="flex gap-4">
                    <button onClick={() => setPart("description")} className={`font-semibold transition-all duration-500 ${part == "description" ? "text-[#FFC845] pb-[1vh] border-b-2 border-b-[#FFC845]" : "hover:text-[#FFC845]"}`}>{t("text6")}</button>
                    <button onClick={() => setPart("comments")} className={`font-semibold transition-all duration-500 ${part == "comments" ? "text-[#FFC845] pb-[1vh] border-b-2 border-b-[#FFC845]" : "hover:text-[#FFC845]"}`}>{t("text7")}</button>
                </aside>
                {part == "description" && (<p className="pl-[1%] w-full">{productById?.description}</p>)}
                {part == "comments" && (
                    <aside className="flex flex-wrap gap-[2vh_2%] w-full">
                        {commentsById &&
                            commentsById?.map((comment: IComment) => {
                                return <div key={comment.id} className="flex transition-all duration-300 p-[2vh_2%] rounded-md hover:bg-[#0000000f] dark:hover:bg-[#ffffff15] cursor-pointer flex-col gap-[2vh] w-full sm:w-[49%]">
                                    <div className="flex gap-3 items-center">
                                        <div className="p-[1.5vh_2.2vh] rounded-full bg-[#00bfff] text-white text-[13px] font-semibold">{comment.user[0]}</div>
                                        <p className="font-semibold">{comment.user}</p>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            })
                        }
                    </aside>
                )}
                {part == "comments" && commentsById?.length == 0 && !isLoadingCommentsById && (
                    <aside className="flex flex-col gap-[1vh] font-semiboldо text-[#00000023] dark:text-[#ffffff23] items-center text-center w-full h-full justify-center p-[10vh_0]">
                        <MessageCircle size={100} />
                        <p>{t("text8")}</p>
                    </aside>
                )}
                {part == "comments" && (
                    <form onSubmit={handleSubmit(addComment)} id="addCom" className="flex transition-all border duration-300 p-[2vh_2%] rounded-md flex-col gap-[2vh] w-full">
                        <p className="font-semibold text-xl">{t("text11")}</p>
                        <div className="flex flex-wrap gap-y-[1vh] justify-between">
                            <select defaultValue={1} {...register("raiting")} form="addCom" className="p-[1.5vh_30px] text-[#FFC845] rounded-md border dark:bg-black w-full sm:w-fit">
                                <option value={1}>1 Crown</option>
                                <option value={2}>2 Crown</option>
                                <option value={3}>3 Crown</option>
                                <option value={4}>4 Crown</option>
                                <option value={5}>5 Crown</option>
                            </select>
                            <input {...register("comment")} form="addCom" className="w-full sm:w-[75%] p-[1.5vh_20px] rounded-md border" placeholder={t("text12")} />
                            <button form="addCom" className="bg-[#FFC845] transition-all duration-500 hover:bg-[#ffc745db] text-white font-semibold cursor-pointer p-[1.5vh_0] sm:p-[1.2vh_0] rounded-md w-full sm:w-[12%]">{t("text13")}</button>
                        </div>
                    </form>
                )}
                {part == "comments" && isLoadingCommentsById && (
                    <aside className="flex flex-wrap gap-[2vh_2%] w-full">
                        <Skeleton className="w-full sm:w-[49%] h-[15vh]" />
                        <Skeleton className="w-full sm:w-[49%] h-[15vh]" />
                        <Skeleton className="w-full sm:w-[49%] h-[15vh]" />
                        <Skeleton className="w-full sm:w-[49%] h-[15vh]" />
                        <Skeleton className="w-full sm:w-[49%] h-[15vh]" />
                        <Skeleton className="w-full sm:w-[49%] h-[15vh]" />
                    </aside>
                )}
            </section>
        </main>
    )
}

export default ProductInfo