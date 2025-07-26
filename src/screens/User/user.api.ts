import http, { handleHttpError, handleHttpResponse } from 'services/http'
import { HTTPResponse } from 'services/http/http.types'
import { IUser } from 'types/global'
import { ICreateUserResponse, IUpdateUserDto } from 'screens/User/user.types'

const loadUser = (id: string): Promise<HTTPResponse<Omit<IUser, 'password'>>> => {
    return http.get(`/v1/users/${id}`).then(handleHttpResponse).catch(handleHttpError)
}

const updateUser = (dto: IUpdateUserDto): Promise<HTTPResponse<Omit<IUser, 'password'>>> => {
    const { id, ...dtoWithoutId } = dto;
    return http.patch(`/v1/users/${id}`, dtoWithoutId)
        .then(handleHttpResponse)
        .catch(handleHttpError);
}

const deleteUser = (id: string): Promise<HTTPResponse> => {
    return http.delete(`/v1/users/${id}`).then(handleHttpResponse).catch(handleHttpError)
}

const createUser = (dto: Omit<IUser, 'id'>): Promise<HTTPResponse<ICreateUserResponse>> => {
    return http.post('/v1/users', dto).then(handleHttpResponse).catch(handleHttpError)
}
export const userApi = {
    loadUser,
    updateUser,
    deleteUser,
    createUser,
}