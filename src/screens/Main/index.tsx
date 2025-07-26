import { useEffect } from 'react'
import { mainApi } from 'screens/Main/main.api'
import { useAtom, useAtomValue } from 'jotai'
import { usersAtom, usersWithoutAdminAtom } from 'screens/Main/main.atom'
import styles from './main.module.css'
import { userApi } from 'screens/User/user.api'
import { useNavigate } from 'react-router-dom'
import useHttpLoader from 'shared/hooks/httpLoader/useHttpLoader'
import LoaderPage from 'shared/LoaderPage'
import UsersTable from 'screens/Main/components/UsersTable'


const Main = () => {
    const [allUsers, setAllUsers] = useAtom(usersAtom)
    const allUsersWithoutAdmin = useAtomValue(usersWithoutAdminAtom)
    const navigate = useNavigate()
    const { wait, loading } = useHttpLoader()

    useEffect(() => {
        wait(mainApi.getUsers(), (resp) => {
            if (resp.status === 'success') {
                setAllUsers(resp.body)
            }
        })
    }, [])


    const handleDelete = async (id: string) => {
        const response = await userApi.deleteUser(id)
        if (response.status === 'success') {
            setAllUsers(allUsers.filter(user => user.id !== id))
        }
    }

    const handleEdit = (userId: string) => {
        navigate(`/user/update/${userId}`)
    }


    if (loading) {
        return <LoaderPage />
    }

    return (
        <div className={styles.container}>
            <UsersTable
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                dataSource={allUsersWithoutAdmin}
                className={styles.usersTable}
            />
        </div>
    )
}

export default Main