"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { deleteComment, getMyComments } from "@/reducers/user/api"
import { IMyComment } from "@/reducers/user/user"
import { RootState } from "@/store/store"
import { CloudAlert, EllipsisVertical, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Comments = () => {
  const t = useTranslations("myComments")
  const tt = useTranslations("info")
  const { isLoadingMyComments, myComments } = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch() as any

  useEffect(() => {
    dispatch(getMyComments())
  }, [])
  return (
    <section className="flex flex-col gap-[4vh] w-full items-start">
      <h2 className="text-2xl font-semibold">{t("text1")}</h2>
      <aside className="flex gap-[2vh_4%] w-full flex-wrap">
        {myComments &&
          myComments.map((comment: IMyComment) => {
            return <div key={comment.id} className="flex flex-col gap-[2vh] p-[2vh_2%] rounded-md transition-all duration-500 hover:bg-[#00000014] dark:hover:bg-[#ffffff24] w-full sm:w-[48%]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical size={12} className="cursor-pointer fixed ml-[28.5%]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => dispatch(deleteComment(comment.id))}>{t("text2")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex gap-2 items-center">
                <p className="flex justify-center items-center w-10 h-10 bg-[#00bfff] text-white text-[13px] rounded-full">{comment.user_name[0]}</p>
                <p className="font-semibold text-[15px]">{comment.user_name}</p>
              </div>
              <p>{comment.text}</p>
            </div>
          })
        }
      </aside>
      {isLoadingMyComments && (
        <aside className="flex gap-[2vh_4%] w-full flex-wrap">
          <Skeleton className="w-full sm:w-[48%] rounded-md h-[15vh]" />
          <Skeleton className="w-full sm:w-[48%] rounded-md h-[15vh]" />
          <Skeleton className="w-full sm:w-[48%] rounded-md h-[15vh]" />
          <Skeleton className="w-full sm:w-[48%] rounded-md h-[15vh]" />
          <Skeleton className="w-full sm:w-[48%] rounded-md h-[15vh]" />
          <Skeleton className="w-full sm:w-[48%] rounded-md h-[15vh]" />
        </aside>
      )}
      {!isLoadingMyComments && myComments && myComments.length == 0 ? (
        <aside className="flex flex-col font-semibold text-[#00000028] dark:text-[#ffffff2d] gap-[2vh] w-full items-center m-[10vh_0]">
          <MessageCircle size={70} />
          <p>{t("text3")}</p>
        </aside>
      ) : !isLoadingMyComments && !myComments ? (
        <aside className="flex flex-col font-semibold text-[#00000028] dark:text-[#ffffff2d] gap-[2vh] w-full items-center m-[10vh_0]">
          <CloudAlert size={100} />
          <p className="font-semibold">{tt("text9")}</p>
          <button onClick={() => {
            dispatch(getMyComments())
          }} className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745bc] text-white p-[0.8vh_40px] cursor-pointer rounded-md">{tt("text10")}</button>

        </aside>
      ) : null}
    </section>
  )
}

export default Comments