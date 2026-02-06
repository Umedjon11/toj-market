"use client"

import { addToCart } from "@/reducers/cart/api"
import { getShopById } from "@/reducers/shops/api"
import { IProduct } from "@/reducers/shops/shops"
import { RootState } from "@/store/store"
import { ShoppingCart } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from "@/components/ui/skeleton"

const Store = () => {
    const { id } = useParams()
    const { shopById, isLoadingShopById } = useSelector((state: RootState) => state.shops)
    const t = useTranslations("myShop")
    const tt = useTranslations("product")
    const dispatch = useDispatch() as any
    const api = process.env.NEXT_PUBLIC_DATA_API

    useEffect(() => {
        dispatch(getShopById(id))
    }, [])

    if (isLoadingShopById) {
        return <main className="flex flex-col gap-[5vh] min-h-[85vh] items-start w-[80%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
            <div suppressHydrationWarning={true} className="flex gap-6 items-center">
                <Skeleton className="w-28 h-28" />
                <div className="flex items-start flex-col gap-[1vh]">
                 <Skeleton className="w-40 h-7" />
                    <Skeleton className="w-70 h-7" />
                </div>
            </div>
            <Skeleton className="w-full h-[18vh]" />
            <div className="flex flex-col gap-[3vh] bg-[white] dark:bg-[#1E2024] w-full p-[5vh_8%] sm:p-[4vh_3%] rounded-xl">
                <Skeleton className="w-33 h-6" />
                <div className="flex flex-wrap gap-[5vh_1%] w-full">
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh]" />
                        <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
                            <Skeleton className="w-20 h-7" />
                            <Skeleton className="w-20 h-7" />
                        </div>
                        <Skeleton className="w-[85%] h-7" />
                        <Skeleton className="w-full h-11" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh]" />
                        <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
                            <Skeleton className="w-20 h-7" />
                            <Skeleton className="w-20 h-7" />
                        </div>
                        <Skeleton className="w-[85%] h-7" />
                        <Skeleton className="w-full h-11" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh]" />
                        <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
                            <Skeleton className="w-20 h-7" />
                            <Skeleton className="w-20 h-7" />
                        </div>
                        <Skeleton className="w-[85%] h-7" />
                        <Skeleton className="w-full h-11" />
                    </div>
                    <div className="w-full sm:w-[23.5%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
                        <Skeleton className="w-full h-[40vh]" />
                        <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
                            <Skeleton className="w-20 h-7" />
                            <Skeleton className="w-20 h-7" />
                        </div>
                        <Skeleton className="w-[85%] h-7" />
                        <Skeleton className="w-full h-11" />
                    </div>
                </div>
            </div>
        </main>
    }

    return (
    <main className="flex flex-col gap-[5vh] min-h-[85vh] items-start w-[80%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
            <div className="flex gap-6 items-center">
                <img className="w-28 h-28 rounded-xl hover:camera:text-[red] cursor-pointer" draggable={false} src={shopById?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnj3mkZ1Rib4R4xBJbv88hW8U1wd4neiwuA&s"} />
                <div className="flex items-start flex-col gap-[1vh]">
                    <p className="font-semibold text-2xl mb-[-1vh]">{shopById?.title}</p>
                    <p className="text-[#D1D3D4] dark:text-white w-70 max-w-70 sm:w-82 sm:max-w-82 line-clamp-1">{shopById?.bio}</p>
                </div>
            </div>
            <aside className="p-[5vh_4%] flex flex-col gap-[2vh] rounded-xl bg-[white] dark:bg-[#1E2024] w-full">
                <p className="text-[#6E759F]">{t("text5")}</p>
                <p className="font-semibold text-xl">{shopById?.seller_full_name}</p>
            </aside>
            <div className="flex flex-col gap-[3vh] bg-[white] dark:bg-[#1E2024] w-full p-[5vh_8%] sm:p-[4vh_3%] rounded-xl">
                <p className="text-[#6E759F]">{t("text3")}</p>
                <div className="flex flex-wrap gap-[5vh_1%] w-full">
                    {shopById &&
                        shopById?.most_popular_products?.map((product: IProduct) => {
                            return <div key={product.id} className="w-full sm:w-[23.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                                {product.discount > 0 && (<p className="rounded-md p-[0.5vh_10px] absolute bg-[#FF4444] ml-[2vh] mt-[34.5vh] w-fit text-white">-{product.discount}%</p>)}
                                <div className="p-[1vh] rounded-xl flex items-center justify-center bg-[#F7F8F9] w-full h-[40vh]">
                                    <img
                                        src={product.main_image ? `${api + product.main_image}` : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"}
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
                                <Link href={`/products/${product.id}`} className="text-xl transition-all duration-300 hover:text-[#FFC845] font-bold">{product.title}</Link>
                                <button onClick={() => dispatch(addToCart(product.id))} className="flex gap-3 items-center justify-center font-semibold text-white w-[98%] hover:bg-[#ffc745db] m-[0_auto] p-[1vh_0] mb-[1vh] mt-[1vh] border-[#FFC845] bg-[#FFC845] transition-all duration-500 cursor-pointer rounded-xl border"><ShoppingCart /> {tt("text1")}</button>
                            </div>
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default Store