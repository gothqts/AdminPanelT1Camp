import {atom} from 'jotai'
import { IAuth } from 'screens/Login/login.types'

export const authAtom = atom<IAuth | null>(null)