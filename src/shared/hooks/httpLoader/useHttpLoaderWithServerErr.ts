import useHttpLoader from './useHttpLoader'
import { AxiosError } from 'axios'
import { HTTPResponse } from 'services/http/http.types'
import { useState } from 'react'

const useHttpLoaderWithServerErr = () => {
    const [serverError, setServerError] = useState('')
    const { wait: baseWait, loading } = useHttpLoader()

    const wait = <ResponseBody, T extends HTTPResponse<ResponseBody>>(
        p: Promise<T>,
        onLoad?: (v: T) => any,
        onError?: (err: AxiosError) => any
    ) => {
        setServerError('')

        baseWait(
            p,
            (resp) => {
                if (resp.status === 'error') {
                    setServerError(resp?.body?.message || resp.message)
                }

                if (onLoad) onLoad(resp)
            },
            onError
        )
    }

    return { loading, serverError, wait }
}

export default useHttpLoaderWithServerErr
