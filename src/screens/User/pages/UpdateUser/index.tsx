import styles from 'screens/User/userScreen.module.css'
import UserForm from 'screens/User/components/UserForm'
import { useEffect, useState } from 'react'
import { IUser } from 'types/global'
import { userApi } from 'screens/User/user.api'
import { useParams } from 'react-router-dom'
import LoaderPage from 'shared/LoaderPage'
import useHttpLoaderWithServerErr from 'shared/hooks/httpLoader/useHttpLoaderWithServerErr'

const UpdateUser = () => {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<Omit<IUser, 'password'> | null>(null)
    const { wait, loading, serverError } = useHttpLoaderWithServerErr()
    useEffect(() => {
        wait(userApi.loadUser(id as string), (resp) => {
            if (resp.status === 'success') {
                setUser(resp.body)
            }
        })
    }, [])


    if (loading) {
        return <LoaderPage />
    }
    return (
        <div className={styles.container}>
            {user ? <UserForm action="updateUser" user={user} /> :
                (
                    <div className={styles.err_container}>
                        <span>Что-то пошло не так</span>
                        <span>{serverError}</span>
                    </div>
                )}

        </div>
    )


}

export default UpdateUser