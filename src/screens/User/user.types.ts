import { Dayjs } from 'dayjs'

export interface ICreateUserResponse {
    id: string,
    name: string,
}
export interface IUpdateUserDto {
    id: string,
    name: string,
    surName:string,
    birthDate: Dayjs,
    fullName: string,
    telephone: string,
    employment: string,
    userAgreement: boolean,
}