import { axiosAuth, setToken } from "@/utils/axios"


export const SendCode = async (email: string) => {
    try {
        await axiosAuth.post('/api/accounts/api/auth/send-code/', { email: email })
    } catch (error: any) {
        return error.response.data.email[0]
    }
}

export const Register = async (account: any) => {
    try {
        const { data } = await axiosAuth.post("/api/accounts/api/auth/register/", account)
        setToken(data.access, data.refresh)
        window.location.pathname = "/"
    } catch (error: any) {
            return error.response.data.code ? error.response.data.code[0] : error.response.data.email[0]
    }
}