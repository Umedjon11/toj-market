import { useDispatch, useSelector } from "react-redux"
import { ScrollVelocityContainer, ScrollVelocityRow } from "../ui/scroll-based-velocity"
import { RootState } from "@/store/store"
import { IShop } from "@/reducers/shops/shops"
import { Crown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { getShops } from "@/reducers/shops/api"
import { Skeleton } from "../ui/skeleton"

const OurShops = () => {
    const { isLoading, shops } = useSelector((state: RootState) => state.shops)
    const t = useTranslations("product")
    const tt = useTranslations("home")
    const dispatch = useDispatch() as any

    useEffect(() => {
        dispatch(getShops())
    }, [])

    return (<ScrollVelocityContainer className="bg-white py-12 px-4 sm:px-[5%] rounded-3xl dark:bg-[#111214] w-full border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white dark:from-[#111214] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white dark:from-[#111214] to-transparent z-10 pointer-events-none" />
        <div className="flex flex-col mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {tt("text5")}
            </h2>
            <div className="h-1 w-12 bg-[#FFC845] mt-2 rounded-full" />
        </div>

        <ScrollVelocityRow baseVelocity={5} className="flex items-center">
            {shops && shops.map((shop: IShop) => (
                <button
                    onClick={() => window.location.pathname=`/stores/${shop.id}`}
                    key={shop.id}
                    className="group flex items-center gap-4 bg-gray-50 dark:bg-white/5 border border-transparent hover:border-[#FFC845] hover:bg-white dark:hover:bg-white/10 px-6 py-3 rounded-2xl mx-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                >
                    <div className="relative">
                        <img
                            src={shop.avatar}
                            alt={shop.title}
                            width={54}
                            height={54}
                            draggable={false}
                            className="rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex flex-col">
                        {+shop.avg_crowns === 0 ? (
                            <p className="flex gap-1.5 font-bold text-lg items-center text-gray-300 dark:text-gray-600 transition-colors group-hover:text-gray-400">
                                {t("text3")}
                            </p>
                        ) : (
                            <p className="flex gap-1.5 font-bold text-lg items-center text-[#FFC845]">
                                <Crown className="w-5 h-5 fill-[#FFC845]" />
                                {shop.avg_crowns}
                            </p>
                        )}
                    </div>
                </button>
            ))}
            {isLoading && (
                <div className="flex gap-8 mx-4 items-center bg-gray-50 dark:bg-white/5 px-6 py-3 rounded-2xl animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <div className="flex flex-col gap-2">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                </div>
            )}
        </ScrollVelocityRow>
    </ScrollVelocityContainer>
    )
}

export default OurShops