import useHttpLoaderWithServerErr from 'shared/hooks/httpLoader/useHttpLoaderWithServerErr'

import { IUser } from 'types/global'
import { userApi } from 'screens/User/user.api'
import { IUpdateUserDto } from 'screens/User/user.types'

const useTaskFormAction = () =>{
    const { wait, serverError, loading } = useHttpLoaderWithServerErr()

    const updateUser = (dto: IUpdateUserDto, onSuccess: () => void) => {
        wait(userApi.updateUser(dto), (resp) => {
            if (resp.status === 'success') {
                onSuccess()
            }
        })
    }
    const createUser = (dto: Omit<IUser, 'id'>, onSuccess: () => void) => {
        wait(userApi.createUser(dto), (resp) => {
            if (resp.status === 'success') {
                onSuccess()
            }
        })
    }
    return { actions: { updateUser, createUser }, serverError, loading }
}
export default useTaskFormAction