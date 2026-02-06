"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { getOrders } from '@/reducers/orders/api';
import { IOrder, IOrderedProduct } from '@/reducers/orders/orders';
import { RootState } from '@/store/store';
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyOrders = () => {
    const t = useTranslations("orders")
    const { isLoading, orders } = useSelector((state: RootState) => state.orders)
    const [theOrder, setTheOrder] = useState<null | number>(null)
    const dispatch = useDispatch() as any

    useEffect(() => {
        dispatch(getOrders())
    }, [])
    return (
        <section className="flex gap-[2vh] flex-col w-full items-start">
            <h2 className="text-2xl font-semibold flex mb-[3vh] items-start gap-3 bg-[#F7F8F9] dark:bg-[#1E2024] p-[3vh_40px] rounded-xl w-full">{t("text1")} <span className="font-normal text-[14px] text-[#00000087] dark:text-white">{orders ? orders.length : 0}</span></h2>
            {orders &&
                orders.map((order: IOrder) => {
                    return <div onClick={() => theOrder == order.id ? setTheOrder(null) : setTheOrder(order.id)} key={order.id} className='bg-[#F7F8F9] transition-all duration-500 cursor-pointer flex flex-col gap-[2vh] dark:bg-[#1E2024] p-[2vh_3%] rounded-xl w-full'>
                        <div className='flex w-full justify-between items-end'>
                            <p className='font-semibold'>{order.total_amount} c</p>
                            <p className={`font-medium ml-auto mr-[4%] text-[14px] ${order.status == "PN" ? "text-[orange]" : order.status == "paid" ? "text-[#FFC845]" : order.status == "shipped" ? "text-[#00bfff]" : order.status == "cancel" ? "text-[red]" : order.status == "delivered" ? "text-[lime]" : ""}`}>{order.status_display}</p>
                            <p className='font-semibold text-[10px]'>{order.created_at.slice(0, 10)} {order.created_at.slice(11, 19)}</p>
                        </div>
                        {theOrder == order.id && (<p className='w-full border'></p>)}
                        {theOrder == order.id &&
                            order.items.map((item: IOrderedProduct) => {
                                return <div key={item.id} className='flex p-[1vh_0] justify-between w-full items-center'>
                                    <p className='font-semibold'>{item.product_name} pcs</p>
                                    <p className='ml-auto mr-[2%]'>{item.quantity} pcs</p>
                                    <div className='flex flex-col min-w-[15%]'>
                                        <p className='font-semibold text-end'>{(+item.price_at_purchase * item.quantity).toFixed(2)} c</p>
                                        {item.quantity > 1 && (<p className='text-[10px] text-end'>1 pcs / {item.price_at_purchase} c</p>)}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
            {isLoading && (
                <div className='flex flex-col gap-[2vh] w-full'>
                    <Skeleton className='w-full h-[8vh] rounded-xl' />
                    <Skeleton className='w-full h-[8vh] rounded-xl' />
                    <Skeleton className='w-full h-[8vh] rounded-xl' />
                    <Skeleton className='w-full h-[8vh] rounded-xl' />
                    <Skeleton className='w-full h-[8vh] rounded-xl' />
                </div>
            )}
            {!isLoading && !orders || !isLoading && orders.length == 0 ? (<div className='w-full text-[#00000034] dark:text-[#ffffff34] m-[10vh_0] flex flex-col items-center justify-center gap-[2vh]'>
                <ShoppingBag size={100} />
                <p className='font-medium'>{t("text2")}</p>
                <Link href={"/products"} className='text-white p-[1vh_20px] rounded-md transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745c1]'>{t("text3")}</Link>
            </div>) : null}
        </section>
    )
}

export default MyOrders