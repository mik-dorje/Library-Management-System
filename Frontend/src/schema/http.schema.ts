import {
    AxiosBasicCredentials,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
    Method,
} from "axios";

export interface IApiDetails {
    /** Query Keys Action Name */
    queryKeyName: string;
    /** Request API URI */
    controllerName: string;
    /** Request Method; Defaults as GET */
    requestMethod?: RequestMethodEnum;
    /** Request Body Type */
    requestBodyType?: RequestBodyType;
    requestAuthType?: RequestAuthType;
    /* baseApiEndpoint, if provided will override the application's base api endpoint */
    baseApiEndpoint?: string;
}

export interface IApiRequestDetails {
    /** Request data for the API */
    requestData?: RequestDataType;
    /** REST API Method
     *
     * This will override requestMethod provided by apiDetails
     */
    requestMethod?: Method;
    /** Path variables present in controller
     *
     * Provided pathVariables -> {id: 1, type: 'test'}
     * Converts controller-url/{id}/{type} -> controller-url/1/test
     */
    pathVariables?: { [key: string]: Primitive };
    /** Request params
     *
     * Provided params -> {id: 1, type: 'test'}
     * Converts controller-url -> controller-url?id=1&type=test
     */
    params?: RequestParam;
    /** Axios cancel token source */
    cancelSource?: CancelTokenSource;
    /** Disable Success Toast */
    disableSuccessToast?: boolean;
    /** Disable Failure Toast */
    disableFailureToast?: boolean;
    enableSuccessToast?: boolean;
    initialAuthToken?: string;
}

export enum RequestMethodEnum {
    GET = "GET",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    PURGE = "PURGE",
    LINK = "LINK",
    UNLINK = "UNLINK",
}

export enum RequestBodyType {
    /** If request id in application/x-www-form-urlencoded as string */
    QUERYSTRING = "QUERY-STRING",
    /** If request is in formdata */
    FORMDATA = "FORM-DATA",
    FILE = "FILE",
}

export enum RequestAuthType {
    /** If request requires Bearer */
    AUTH = "AUTH",
    /** If request is open but needs basic auth */
    NOAUTH = "NO-AUTH",
    /** If request is open and needs no auth */
    NOBASICAUTH = "NO-BASIC-AUTH",
}

export interface CustomResponse<TData> extends AxiosResponse {
    message: string;
    data: TData | null;
    status: number;
}

export interface CustomDataResponse<TData = any> {
    message: string;
    data: TData | null;
    status: number;
}

export interface CommonArrayResponseTypes<T> {
    description?: string;
    servedBy?: string;
    status?: number;
    success?: boolean;
    data: {
        hasNext?: boolean;
        records: T;
        totalPages: number;
        totalRecords: number;
    };
}

export interface ArrayResponseTypes<T> {
    description?: string;
    servedBy?: string;
    status?: number;
    success?: boolean;
    data: {
        next?: null | number;
        records: T;
        previous?: null | number;
        count?: number;
    };
}

export interface PaginatedParams {
    page_size?: number | string;
    page?: number | string;
    escape_pg?: boolean;
}

export interface ResponseError {
    message: string;
    data: any;
    status: boolean;
    response?: AxiosResponse;
    config?: AxiosRequestConfig;
    noconnection?: boolean;
    isAxiosError?: boolean;
    logout?: boolean;
}

export interface BasicResponse {
    description: string;
    servedBy: string;
    status: number;
    success: boolean;
}

export type Primitive = string | boolean | number;

export interface RequestParam {
    [key: string]: Primitive | undefined;
}

export type RequestDataType = any;

export interface TransformedRequestData {
    auth?: AxiosBasicCredentials;
    data: unknown;
}

export interface IGenericPaginatedRequest {
    page: number;
    row: number;
}

export interface IGenericPaginatedResponse<T> extends IServerSideParams {
    content: T;
}
