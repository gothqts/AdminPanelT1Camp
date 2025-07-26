export interface IHTTPSuccessResponse<T = undefined> {
    status: 'success'
    body: T
}

export interface IHTTPErrorResponse {
    status: 'error'
    message: string
    code: number
    body?: Record<string, string>
}

export type HTTPResponse<T = undefined> =
    | IHTTPErrorResponse
    | IHTTPSuccessResponse<T>
