import { Dayjs } from 'dayjs'

export interface IUser {
    id: string,
    name: string,
    surName: string,
    fullName: string,
    email: string,
    password: string,
    birthDate: Dayjs,
    telephone: string,
    employment: string,
    userAgreement: boolean,
}