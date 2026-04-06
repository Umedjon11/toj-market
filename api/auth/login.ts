import { axiosAuth, setToken } from "@/utils/axios"


export const logIn = async (account : { email: string, password: string }) => {
    try {
        const { data } = await axiosAuth.post("/api/accounts/auth/login/", account)

        setToken(data.access, data.refresh)
        window.location.pathname = "/"
    } catch (error: any) {
        return error.response.data.non_field_errors[0]
    }
}