import { axiosNav } from "@/utils/axios"



export const getUserInfo = async () => {
    try {
        const { data } = await axiosNav.get("/api/accounts/api/auth/get_user/")
        return data
    } catch (error) {}
}