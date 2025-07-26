import { Navigate } from 'react-router'
import urls from 'navigation/app.urls'
import type { RouteProps } from 'navigation/navigation.types'
import { authAtom } from 'screens/Login/login.atom'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { authApi } from 'screens/Login/login.api'
import LoaderPage from 'shared/LoaderPage'

const PublicRoute = ({ Component }: RouteProps) => {
    const [auth, setAuth] = useAtom(authAtom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authApi.auth()
            .then((resp) => {
                if (resp.status === 'success') {
                    setAuth(resp.body)
                } else {
                    setAuth(null)
                }
            })
            .catch(() => setAuth(null))
            .finally(() => setLoading(false))
    }, [setAuth])

    if (loading) {
        return <LoaderPage />
    }

    if (auth !== null) {
        return <Navigate to={urls.main} replace />
    }

    return <Component />
}

export default PublicRoute