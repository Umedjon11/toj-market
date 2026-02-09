"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategories } from "@/reducers/categories/api"
import { ICategory } from "@/reducers/categories/categories"
import { addNewImage, addNewProduct, deleteProduct, deleteShop, editAvatar, editProduct, getMyShop, makeDiscountProduct } from "@/reducers/shop/api"
import { IMyProduct } from "@/reducers/shop/shop"
import { RootState } from "@/store/store"
import { Camera, ImagePlus, Pen, Percent, Store, StoreIcon, Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

const MyShop = () => {
  const { isLoading, shop } = useSelector((state: RootState) => state.shop)
  const { categories } = useSelector((state: RootState) => state.categories)
  const [images, setImages] = useState<FileList | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [haveMainImage, setHaveMainImage] = useState<null | boolean>(null)
  const [productId, setProductId] = useState<null | number>(null)
  const dispatch = useDispatch() as any
  const api = process.env.NEXT_PUBLIC_DATA_API
  const ref = useRef<any>(null)
  const t = useTranslations("myShop")
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openShopEdit, setOpenShopEdit] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const { register, handleSubmit, setValue, reset } = useForm()
  const [product, setProduct] = useState<null | IMyProduct>(null)
  const change = (image: File) => {
    const form = new FormData
    form.append("title", shop ? shop?.title : "")
    form.append("bio", shop ? shop?.bio : "")
    form.append("avatar", image)

    dispatch(editAvatar({ id: shop?.id || 0, image: form }))
  }

  const makeDiscount = async (data: any) => {
    const form = new FormData
    form.append("title", product ? product?.title : "")
    form.append("description", "")
    form.append("price", product ? product?.price : "")
    form.append("category", product ? product?.category + "" : "")
    form.append("quantity", "100")
    form.append("discount", data.discount + "")

    const res = await dispatch(makeDiscountProduct({ id: product ? product?.id : 0, discount: form }))
    if (res && res.payload) {
      toast.success(t("text11"))
      setOpen(false)
      reset({ discount: "" })
    }
    else {
      toast.error(t("text12"))
    }
  }

  const addNew = async (data: any) => {
    const form = new FormData
    form.append("title", data.title)
    form.append("description", data.description)
    form.append("price", data.price)
    form.append("category", data.category)
    form.append("quantity", data.quantity)
    form.append("discount", data.discount)

    const res = await dispatch(addNewProduct(form))
    if (res && res.payload) {
      setOpenAdd(false)
      reset({ discount: "", title: "", description: "", price: "", quantity: "", category: "" })
      if (images) {
        for (let i = 0; i < images.length; i++) {
          if (i == 0) {
            const form = new FormData
            form.append("image", images[i])
            form.append("is_main_image", true + "")

            dispatch(addNewImage({ id: res.payload.id, image: form }))
          }
          else {
            const form = new FormData
            form.append("image", images[i])
            form.append("is_main_image", false + "")

            dispatch(addNewImage({ id: res.payload.id, image: form }))
          }
        }
      }
      toast.success(t("text20"))
      dispatch(getMyShop())
      setImages(null)
    }
    else {
      toast.error(t("text12"))
    }
  }

  const image = async (data: any) => {
    if (images) {
      for (let i = 0; i < images.length; i++) {
        if (!haveMainImage) {
          const form = new FormData
          form.append("image", images[i])
          form.append("is_main_image", true + "")
          setHaveMainImage(true)
          dispatch(addNewImage({ id: productId || 0, image: form }))
        }
        else {
          const form = new FormData
          form.append("image", images[i])
          form.append("is_main_image", false + "")

          dispatch(addNewImage({ id: productId || 0, image: form }))
        }
      }
      setOpenImage(false)
      dispatch(getMyShop())
      toast.success(t("text20"))
      setImages(null)
      setHaveMainImage(null)
    }
    else {
      toast.error(t("text12"))
    }
  }

  const edit = async (data: any) => {
    const form = new FormData
    form.append("title", data.title)
    form.append("description", data.description)
    form.append("price", data.price)
    form.append("category", data.category)
    form.append("quantity", data.quantity)
    form.append("discount", data.discount)

    const res = await dispatch(editProduct({ id: editId || 0, product: form }))
    if (res && res.payload) {
      setOpenEdit(false)
      reset({ discount: "", title: "", description: "", price: "", quantity: "", category: "" })
      toast.success(t("text23"))
      setEditId(null)
      dispatch(getMyShop())
    }
    else {
      toast.error(t("text12"))
    }
  }

  const editShop = async (data: any) => {
    const form = new FormData
    form.append("title", data.title)
    form.append("bio", data.bio)

    const res = await dispatch(editAvatar({ id: shop?.id || 0, image: form }))
    if (res) {
      toast.success(t("text31"))
      reset({ title: "", bio: "" })
      setOpenShopEdit(false)
    }
    else {
      toast.error(t("text12"))
    }
  }

  useEffect(() => {
    dispatch(getMyShop())
    dispatch(getCategories())
  }, [])


  if (!isLoading && !shop) {
    return <div className="flex flex-col gap-[2vh] text-[#00000027] dark:text-[#ffffff22] items-center text-center w-full justify-center m-[10vh_0] sm:m-[20vh_0]">
      <Store size={150} />
      <p className="font-semibold">{t("text2")}</p>
    </div>
  }

  if (isLoading) {
    return <section className="w-full flex flex-col gap-[6vh]">
      <div className="flex gap-6 items-center">
        <Skeleton className="w-28 h-28 rounded-md" />
        <div className="flex items-start flex-col gap-[1vh]">
          <Skeleton className="w-40 h-7" />
          <Skeleton className="w-85 h-6" />
          <div className="flex gap-[2vh] items-center">
            <Skeleton className="w-30 h-8.5" />
            <Skeleton className="w-30 h-8.5" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-[16vh]" />
      <div className="flex flex-col gap-[2vh] bg-[#F7F8F9] dark:bg-[#1E2024] w-full p-[4vh_8%] sm:p-[4vh_3%] rounded-xl">
        <Skeleton className="w-45 h-8" />
        <div className="flex flex-wrap gap-[5vh_3.3%] w-full">
          <div className="w-full sm:w-[30%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
            <Skeleton className="w-full h-[40vh]" />
            <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
              <Skeleton className="w-30 h-8" />
              <Skeleton className="w-30 h-8" />
            </div>
            <Skeleton className="w-full h-8" />
            <div className="flex gap-8 w-fit">
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
            </div>
          </div>
          <div className="w-full sm:w-[30%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
            <Skeleton className="w-full h-[40vh]" />
            <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
              <Skeleton className="w-30 h-8" />
              <Skeleton className="w-30 h-8" />
            </div>
            <Skeleton className="w-full h-8" />
            <div className="flex gap-8 w-fit">
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
            </div>
          </div>
          <div className="w-full sm:w-[30%] flex flex-col gap-[2vh] rounded-xl p-[1vh]">
            <Skeleton className="w-full h-[40vh]" />
            <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
              <Skeleton className="w-30 h-8" />
              <Skeleton className="w-30 h-8" />
            </div>
            <Skeleton className="w-full h-8" />
            <div className="flex gap-8 w-fit">
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
              <Skeleton className="w-9 h-9" />
            </div>
          </div>
        </div>
      </div>
    </section>
  }

  return (
    <section className="w-full flex flex-col gap-[6vh]">

      <Dialog open={open} onOpenChange={() => {
        setOpen(false)
        reset({ discount: 0 })
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("text6")}</DialogTitle>
            <DialogDescription>
              {t("text7")}
            </DialogDescription>
            <form onSubmit={handleSubmit(makeDiscount)} className="w-full flex flex-col gap-[2vh]" id="make">
              <input form="make" {...register("discount")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text10")} type="number" min={0} max={100} />
              <div className="flex justify-between flex-wrap gap-y-[1vh]">
                <button type="button" onClick={() => {
                  setOpen(false)
                  reset({ discount: "" })
                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text8")}</button>
                <button form="make" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text9")}</button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openShopEdit} onOpenChange={() => {
        setOpenShopEdit(false)
        reset({ title: "", bio: "" })
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("text26")}</DialogTitle>
            <DialogDescription>
              {t("text27")}
            </DialogDescription>
            <form onSubmit={handleSubmit(editShop)} className="w-full flex flex-col gap-[2vh]" id="editShop">
              <input form="editShop" {...register("title")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text28")} />
              <input form="editShop" {...register("bio")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text29")} />
              <div className="flex justify-between flex-wrap gap-y-[1vh]">
                <button type="button" onClick={() => {
                  setOpenShopEdit(false)
                  reset({ title: "", bio: "" })
                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text8")}</button>
                <button form="editShop" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text30")}</button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openAdd} onOpenChange={() => {
        setOpenAdd(false)
        reset({ discount: "", title: "", description: "", price: "", quantity: "", category: "1" })
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("text13")}</DialogTitle>
            <DialogDescription>
              {t("text14")}
            </DialogDescription>
            <form onSubmit={handleSubmit(addNew)} className="w-full flex flex-col gap-[2vh]" id="add">
              <input type="file" required multiple onChange={(e) => setImages(e.target.files)} className="p-[1.5vh_20px] rounded-md border" />
              <input form="add" {...register("title")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text16")} />
              <input form="add" {...register("description")} className="p-[1.5vh_20px] rounded-md border" placeholder={t("text17")} />
              <input form="add" {...register("price")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text18")} type="number" min={10} max={100000} />
              <input form="add" {...register("quantity")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text19")} type="number" min={1} max={10000} />
              <input form="add" {...register("discount")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text10")} type="number" min={0} max={100} />
              <select {...register("category")} defaultValue={1} className="p-[1.5vh_20px] border rounded-md dark:bg-black w-full">
                {
                  categories.map((category: ICategory) => {
                    return <option key={category.id} value={category.id}>{category.title}</option>
                  })
                }
              </select>
              <div className="flex justify-between flex-wrap gap-y-[1vh]">
                <button type="button" onClick={() => {
                  setOpenAdd(false)
                  reset({ discount: "", title: "", description: "", price: "", quantity: "", category: "1" })
                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text8")}</button>
                <button form="add" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text15")}</button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openImage} onOpenChange={() => {
        setOpenImage(false)
        setImages(null)
        setProductId(null)
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("text24")}</DialogTitle>
            <DialogDescription>
              {t("text25")}
            </DialogDescription>
            <form onSubmit={handleSubmit(image)} className="w-full flex flex-col gap-[2vh]" id="add">
              <input type="file" required multiple onChange={(e) => setImages(e.target.files)} className="p-[1.5vh_20px] rounded-md border" />
              <div className="flex justify-between flex-wrap gap-y-[1vh]">
                <button type="button" onClick={() => {
                  setOpenImage(false)
                  setImages(null)
                  setProductId(null)
                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text8")}</button>
                <button form="add" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text15")}</button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onOpenChange={() => {
        setOpenEdit(false)
        reset({ discount: "", title: "", description: "", price: "", quantity: "", category: "" })
        setImages(null)
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("text21")}</DialogTitle>
            <DialogDescription>
              {t("text22")}
            </DialogDescription>
            <form onSubmit={handleSubmit(edit)} className="w-full flex flex-col gap-[2vh]" id="edit">
              <input form="edit" {...register("title")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text16")} />
              <input form="edit" {...register("description")} className="p-[1.5vh_20px] rounded-md border" placeholder={t("text17")} />
              <input form="edit" {...register("price")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text18")} type="number" min={10} max={100000} />
              <input form="edit" {...register("quantity")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text19")} type="number" min={1} max={10000} />
              <input form="edit" {...register("discount")} required className="p-[1.5vh_20px] rounded-md border" placeholder={t("text10")} type="number" min={0} max={100} />
              <select {...register("category")} className="p-[1.5vh_20px] dark:bg-black border rounded-md w-full">
                {
                  categories.map((category: ICategory) => {
                    return <option key={category.id} value={category.id}>{category.title}</option>
                  })
                }
              </select>
              <div className="flex justify-between flex-wrap gap-y-[1vh]">
                <button type="button" onClick={() => {
                  setOpenEdit(false)
                  reset({ discount: "", title: "", description: "", price: "", quantity: "", category: "" })
                  setImages(null)
                }} className="cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] border font-semibold text-[#a1a1a1] dark:text-white dark:border-white">{t("text8")}</button>
                <button form="edit" className={`cursor-pointer p-[1vh_20px] rounded-md transition-all duration-500 w-full sm:w-[48%] text-white font-semibold bg-[#FFC845] hover:bg-[#ffc745ba]`}>{t("text15")}</button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <input ref={ref} onChange={(e: any) => {
        change(e.target.files[0])
      }} type="file" className="hidden" />
      <div className="flex gap-6 items-center">
        <button onClick={() => ref.current.click()} className="transition-all duration-500 hover:*:block">
          <img className="w-28 h-28 rounded-xl hover:camera:text-[red] cursor-pointer" draggable={false} src={shop?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnj3mkZ1Rib4R4xBJbv88hW8U1wd4neiwuA&s"} />
          <Camera className="transition-all duration-500 fixed -mt-20 ml-7.5 text-[#ffffff8b] hidden cursor-pointer" size={50} />
        </button>
        <div className="flex items-start flex-col gap-[1vh]">
          <p className="font-semibold text-2xl mb-[-1vh]">{shop?.title}</p>
          <p className="text-[#D1D3D4] dark:text-white w-70 max-w-70 sm:w-82 sm:max-w-82 line-clamp-1">{shop?.bio}</p>
          <div className="flex gap-[1vh] sm:gap-[2vh] items-center">
            <button onClick={() => dispatch(deleteShop(shop?.id || 0))} className="transition-all duration-500 bg-[#FF4444] hover:bg-[#ff4444cb] w-fit text-white p-[0.5vh_15px] cursor-pointer rounded-md">{t("text1")}</button>
            <button onClick={() => setOpenAdd(true)} className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745be] w-fit text-white p-[0.5vh_15px] cursor-pointer rounded-md">{t("text4")}</button>
            <Pen onClick={() => {
              setValue("title", shop?.title)
              setValue("bio", shop?.bio)
              setOpenShopEdit(true)
            }} className="transition-all duration-500 hover:text-[#FFC845] cursor-pointer" size={16} />
          </div>
        </div>
      </div>
      <aside className="p-[3vh_4%] flex flex-col gap-[1vh] rounded-xl bg-[#F7F8F9] dark:bg-[#1E2024] w-full">
        <p className="text-[#6E759F]">{t("text5")}</p>
        <p className="font-semibold text-xl">{shop?.seller_full_name}</p>
      </aside>
      <div className="flex flex-col gap-[2vh] bg-[#F7F8F9] dark:bg-[#1E2024] w-full p-[4vh_8%] sm:p-[4vh_3%] rounded-xl">
        <p className="text-[#6E759F]">{t("text3")}</p>
        <div className="flex flex-wrap gap-[5vh_3.3%] w-full">
          {shop &&
            shop?.most_popular_products?.map((product: IMyProduct) => {
              return <div key={product.id} className="w-full sm:w-[30%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
                {product.discount > 0 && (<p className="rounded-md p-[0.5vh_10px] absolute bg-[#FF4444] ml-[2vh] mt-[34.5vh] w-fit text-white">-{product.discount}%</p>)}
                <div className="p-[1vh] rounded-xl flex items-center justify-center bg-[white] w-full h-[40vh]">
                  <img
                    src={product.main_image ? `${api + product.main_image}` : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"}
                    alt={product.main_image}
                    width={100}
                    height={100}
                    draggable={false}
                    className="w-fit h-fit max-h-[38vh] rounded-xl"
                  />
                </div>
                <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
                  {product.discount > 0 && (<p className="font-semibold flex gap-2">{((+product.price / 100) * (100 - product.discount)).toFixed(2)} c</p>)}
                  <p className={`${product.discount > 0 ? "line-through" : "font-semibold"}`}>{product.price} c</p>
                </div>
                <Link href={`/products/${product.id}`} className="text-xl transition-all duration-300 hover:text-[#FFC845] font-bold">{product.title}</Link>
                <div className="flex gap-4 w-fit">
                  <Trash onClick={() => dispatch(deleteProduct(product.id))} className="transition-all duration-500 text-[#FF4444] hover:text-[#ff4444cb] cursor-pointer" />
                  <Pen onClick={() => {
                    setOpenEdit(true)
                    setValue("title", product.title)
                    setValue("category", product.category)
                    setValue("discount", product.discount)
                    setValue("price", product.price)
                    setValue("description", "")
                    setValue("quantity", "")
                    setEditId(product.id)
                  }} className="transition-all duration-500 text-[#FFC845] hover:text-[#ffc745be] cursor-pointer" />
                  <Percent onClick={() => {
                    setOpen(true)
                    setProduct(product)
                    setValue("discount", product.discount)
                  }} className="transition-all duration-500 text-[#FF4444] hover:text-[#ff4444cb] cursor-pointer" />
                  <ImagePlus onClick={() => {
                    setOpenImage(true)
                    setProductId(product.id)
                    setHaveMainImage(product.main_image ? true : false)
                  }} className="transition-all duration-500 text-[#FFC845] hover:text-[#ffc745be] cursor-pointer" />
                </div>
              </div>
            })
          }

          {shop && shop?.most_popular_products?.length == 0 && (
            <div className="flex flex-col font-semibold text-[#00000035] dark:text-[#ffffff29] items-center justify-center gap-[1vh] w-full m-[7vh_0]">
              <StoreIcon size={150} />
              <p>{t("text32")}</p>
              <button onClick={() => setOpenAdd(true)} className="transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745be] w-fit text-white p-[0.5vh_15px] cursor-pointer rounded-md">{t("text4")}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MyShop