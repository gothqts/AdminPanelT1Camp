import { Navigate } from 'react-router'
import urls from 'navigation/app.urls'
import type { RouteProps } from './navigation.types.ts'
import { useAtom } from 'jotai'
import { authAtom } from 'screens/Login/login.atom'
import { useEffect, useState } from 'react'
import { authApi } from 'screens/Login/login.api'
import LoaderPage from 'shared/LoaderPage'

const PrivateRoute = ({ Component }: RouteProps) => {
    const [auth, setAuth] = useAtom(authAtom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (auth === null) {
            authApi.auth()
                .then((resp) => {
                    if (resp.status === 'success') {
                        setAuth(resp.body)
                    }
                })
                .catch(() => {
                    setAuth(null)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [auth])

    if (loading) {
        return <LoaderPage />
    }

    if (auth === null) {
        return <Navigate to={urls.login} />
    }

    return <Component />
}

export default PrivateRoute