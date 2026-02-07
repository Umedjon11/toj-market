import { IProduct } from "@/reducers/products/products"


export const getMyWish = () => {
    if (typeof window != undefined) {
        const wish = localStorage.getItem("myWish")
        if (wish) {
            return JSON.parse(wish)
        }
        else {
            return []
        }
    }
}

export const addWish = (product: IProduct) => {
    const myWish = getMyWish()
    if (myWish?.some((wish: IProduct) => wish.id == product.id)) {
        const newWish = myWish.filter((wish: IProduct) => wish.id != product.id)
        localStorage.setItem("myWish", JSON.stringify(newWish))
    }
    else {
        const newWish = [...myWish, product]
        localStorage.setItem("myWish", JSON.stringify(newWish))
    }
}

export const isWished = (wishList: IProduct[], id: number) => {
    return wishList.some((wish: IProduct) => wish.id == id)
}

export const clearWish = () => {
    localStorage.setItem("myWish", JSON.stringify([]))
}