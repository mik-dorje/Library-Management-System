export const getQueryString = (data: { [key: string]: string }) => {
    return new URLSearchParams(data);
};
