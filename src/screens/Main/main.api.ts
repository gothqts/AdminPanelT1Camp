import { HTTPResponse } from 'services/http/http.types'
import http, { handleHttpError, handleHttpResponse } from 'services/http'
import { IUser } from 'types/global'

const getUsers = (): Promise<HTTPResponse<Omit<IUser, 'password'>[]>> => {
    return http.get(`/v1/users`).then(handleHttpResponse).catch(handleHttpError)
}

export const mainApi = {
    getUsers,
}
