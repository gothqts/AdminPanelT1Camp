import { IAuth, IInputs } from 'screens/Login/login.types'
import { HTTPResponse } from 'services/http/http.types'
import http, { handleHttpError, handleHttpResponse } from 'services/http'

const login = (params: IInputs): Promise<HTTPResponse> => {
    return http.post(`/v1/auth/login`, {
        password: params.password,
        email: params.email,
    }).then(handleHttpResponse).catch(handleHttpError)
}
const auth = (): Promise<HTTPResponse<IAuth>> => {
    return http.get(`/v1/auth/me`).then(handleHttpResponse).catch(handleHttpError)
}

const logout = ():Promise<HTTPResponse> =>{
    return http.post(`v1/auth/logout`).then(handleHttpResponse).catch(handleHttpError)
}
export const authApi = {
    login,
    auth,
    logout,
}