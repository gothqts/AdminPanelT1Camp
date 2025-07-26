import axios, { AxiosError, AxiosResponse } from 'axios'
import { IHTTPErrorResponse, IHTTPSuccessResponse } from './http.types'

const http = axios.create({
    baseURL: '/api',
    headers: { withCredentials: true },
})

export const handleHttpResponse = <T extends any>(response: AxiosResponse<T>): IHTTPSuccessResponse<T> => {
    return { status: 'success', body: response.data }
}

export const handleHttpError = (error: AxiosError): IHTTPErrorResponse => {
    if (error?.response?.status === 400) {
        return {
            status: 'error',
            message: 'С вашими данными что-то не так',
            code: error?.response?.status ,
            body: error?.response?.data as Record<string, string>,
        }
    }


    return {
        status: 'error',
        message: error?.message,
        code: error?.response?.status,
    }
}

export default http