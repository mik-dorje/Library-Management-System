interface CustomResponse<TData = unknown> extends AxiosResponse {
    message: string;
    data: TData | null;
    status: number;
}

interface BackendErrorResponse<T> {
    error: T;
    status: number;
    message: string;
}

interface IServerSideParams {
    currentPageIndex?: number;
    numberOfElements?: number;
    totalElements?: number;
    totalPages?: number;
}

interface BackendPaginationResponse<T> extends IServerSideParams {
    content: T;
}

interface GenericObj<Value = string> {
    [key: string]: Value;
}

type ValueOf<Obj> = (
    Obj extends object
        ? {
              [K in keyof Obj]: Obj[K] extends object
                  ? ValueOf<Obj[K]>
                  : Obj[K];
          }[keyof Obj]
        : ""
) extends infer Val
    ? Val
    : never;

type StringNumber = string | number;

interface IServerSidePayload {
    page?: number;
    row?: number;
}

type TAny = any;
