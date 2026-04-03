import axios from "axios"

const api = process.env.NEXT_PUBLIC_DATA_API

export const setToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken)
    localStorage.setItem("refresh_token", refreshToken)
}

export const getAccessToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token")

        return token
    }
}

export const getRefreshToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("refresh_token")

        return token
    }
}

export const removeTokens = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
}

export const axiosRequest = axios.create({
    baseURL: api
})

export const axiosAuth = axios.create({
    baseURL: api
})

axiosRequest.interceptors.request.use(
    (config) => {
        const token = getAccessToken()

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.error(error)
    }
)

export const axiosNav = axios.create({
    baseURL: api
})

axiosNav.interceptors.request.use(
    (config) => {
        const token = getAccessToken()

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.error(error)
    }
)

let isRefreshingToken = false
let waitingRequestest: any = []

const tokenRefreshed = (token: string) => {
    waitingRequestest.forEach((request: any) => request(token))
    waitingRequestest = []
}

const AddNewWatingRequest = (callback: any) => {
    waitingRequestest.push(callback)
}

axiosNav.interceptors.response.use(
    (response) => {
        if (window.location.pathname.includes("/login") || window.location.pathname.includes("/register")) {
            window.location.pathname = "/"
        }

        return response
    },
    async (error) => {
        const request = error.config

        if (error.response.status == 401 && !request.retry) {
            if (!isRefreshingToken) {
                isRefreshingToken = true

                try {
                    const result = await refreshToken()

                    if (result) {
                        tokenRefreshed(result)

                        isRefreshingToken = false

                        return axiosNav(request)
                    }
                } catch (error) {
                    console.error(error)
                }
            }

            return new Promise((resolve) => {
                AddNewWatingRequest((token: string) => {
                    request.headers.Authorization = token
                    resolve(axiosNav(request))
                })
            })
        }
    }
)

axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config
        if (error.response && error.response.status == 401 && !request.retry) {
            if (!isRefreshingToken) {
                isRefreshingToken = true

                try {
                    const newAccessToken = await refreshToken()

                    if (newAccessToken) {
                        tokenRefreshed(newAccessToken)

                        isRefreshingToken = false

                        return axiosRequest(request)
                    }
                    else if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")) {
                        removeTokens()
                        window.location.pathname = "/login"
                    }
                } catch (error) {
                    console.error('Faild to refresh a token', error)
                }
            }

            return new Promise((resolve) => {
                AddNewWatingRequest((token: string) => {
                    request.headers.Authorization = token
                    resolve(axiosRequest(request))
                })
            })
        }

        return error
    }
)

const refreshToken = async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
        try {
            const { data }: { data: { access: string, refresh: string } } = await axiosAuth.post("/api/accounts/api/auth/token/refresh/", { refresh: refreshToken })

            setToken(data.access, data.refresh)

            return data.access
        } catch (error) {
            return null
        }
    }
    return null
}