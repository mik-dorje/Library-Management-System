import { IApiDetails, Primitive } from "@/schema/http.schema";
import TokenService from "@/services/token-storage";

export const getRequestHeaders = (
    apiDetails: IApiDetails,
    initialAuthToken: string | undefined,
    extraData?: { [key: string]: Primitive }
) => {
    const bearerToken =
        extraData?.temporaryToken || TokenService.getAccessToken();

    let headers: { [key: string]: string } = {
        "Content-Type": "application/json",
        Authorization: !initialAuthToken
            ? `Bearer ${bearerToken}`
            : `Bearer ${initialAuthToken}`,
    };

    if (
        apiDetails.requestAuthType === "NO-AUTH" ||
        apiDetails.requestAuthType === "NO-BASIC-AUTH"
    ) {
        delete headers.Authorization;
    }

    switch (apiDetails.requestBodyType) {
        case "QUERY-STRING":
            headers = {
                ...headers,
                "Content-Type": "application/x-www-form-urlencoded",
            };
            break;
        case "FORM-DATA":
            headers = {
                ...headers,
                "Content-Type": "multipart/form-data",
            };
            break;
        default:
            headers = { ...headers };
    }

    return headers;
};
