"use client";

import { addToCart } from "@/reducers/cart/api";
import { getProducts } from "@/reducers/products/api";
import { IProduct } from "@/reducers/products/products";
import { RootState } from "@/store/store";
import { ChevronRight, Crown, Eye, Heart, ShoppingBag, ShoppingCart, TicketPercentIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { addWish, getMyWish, isWished } from "@/api/wish/wishList";

const Products = () => {
    const { isLoading, products } = useSelector((state: RootState) => state.products)
    const t = useTranslations("product")
    const tt = useTranslations("home")
    const [wish, setWish] = useState([])
    const dispatch = useDispatch() as any
    useEffect(() => {
        dispatch(getProducts())
        const myWish = getMyWish()
        setWish(myWish)
    }, [])
    return (
        <section className="flex bg-white p-[5vh_2%] rounded-2xl dark:bg-[#1E2024] w-full gap-[3vh_2%] flex-wrap">
            <aside className="flex gap-4 items-center w-full">
                <h2 className="text-3xl  sm:text-4xl font-semibold">{tt("text3")}</h2>
                <Link className="font-semibold border p-[1.2vh_20px] rounded-full text-[#FFC845] border-[#FFC845] flex gap-2 transition-all duration-500 hover:bg-[#FFC845] hover:text-white" href="/products">{tt("text4")} <ChevronRight /></Link>
            </aside>
            {products &&
                products.slice(0, 20).map((product: IProduct) => {
                    return <div key={product.id} className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        {product.discount > 0 && (<p className="rounded-md p-[0.5vh_10px] absolute bg-[#FF4444] ml-[2vh] mt-[34.5vh] w-fit text-white">-{product.discount}%</p>)}
                        <button onClick={() => {
                            addWish(product)
                            const newWish = getMyWish()
                            setWish(newWish)
                        }} className={`rounded-full p-[0.5vh] absolute ml-[3vh] mt-[2.5vh] w-fit cursor-pointer`}><Heart className={`${isWished(wish, product.id) ? "fill-[#FF4444] stroke-[#FF4444]" : "stroke-[black]"}`} /></button>
                        <div className="p-[1vh] rounded-xl flex items-center justify-center bg-[#F7F8F9] w-full h-[40vh]">
                            <img
                                src={product.main_image ? `${product.main_image}` : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"}
                                alt={product.main_image}
                                width={100}
                                height={100}
                                className="w-fit h-fit max-h-[38vh] rounded-xl"
                            />
                        </div>
                        <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
                            {product.discount > 0 && (<p className="font-semibold flex gap-2">{((+product.price / 100) * (100 - product.discount)).toFixed(2)} c</p>)}
                            <p className={`${product.discount > 0 ? "line-through" : "font-semibold"}`}>{product.price} c</p>
                        </div>
                        <Link href={`products/${product.id}`} className="text-xl transition-all duration-300 hover:text-[#FFC845] font-bold">{product.title}</Link>
                        <p className={`${+product.avg_crowns > 0 ? "text-[#FFC845]" : "text-[#D1D3D4]"} font-semibold flex`}>{+product.avg_crowns > 0 ? (<span className="flex gap-2 items-center"><Crown className="fill-[#FFC845] stroke-[#FFC845]" /> {product.avg_crowns}</span>) : (<span className="flex gap-2 items-center"><Crown />{t("text3")}</span>)}</p>
                        <button onClick={() => dispatch(addToCart(product.id))} className="flex gap-3 items-center justify-center font-semibold text-white w-[98%] hover:bg-[#ffc745db] m-[0_auto] p-[1vh_0] mb-[1vh] mt-[1vh] border-[#FFC845] bg-[#FFC845] transition-all duration-500 cursor-pointer rounded-xl border"><ShoppingCart /> {t("text1")}</button>
                    </div>
                })
            }
            {isLoading && (
                <div className="flex w-full gap-[3vh_2%] flex-wrap">
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh] rounded-xl" />
                        <div className="flex gap-5 items-center flex-wrap">
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                            <Skeleton className="w-[45%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-full h-[4vh] rounded-xl" />
                        <div className="text-[#F1BB49] flex gap-15 mt-[2vh]">
                            <Skeleton className="w-[48%] h-[3vh] rounded-xl" />
                        </div>
                        <Skeleton className="w-[98%] h-[6.5vh]" />
                    </div>
                </div>
            )}
            {products && products.length == 0 && !isLoading || !products ? (
                <div className="flex flex-col text-[#d9dada59] dark:text-[#191b21] items-center m-[15vh_0] gap-[1vh] justify-center w-full">
                    <ShoppingBag size={100} />
                    <p className="text-2xl font-semibold">{t("text2")}</p>
                </div>
            ) : null}
        </section>
    )
}

export default Products