import { atom } from 'jotai'
import { IUser } from 'types/global'

export const usersAtom = atom<Omit<IUser, 'password'>[]>([])

export const usersWithoutAdminAtom = atom(
    (get) => get(usersAtom).filter(user => user.id !== '1'),
)