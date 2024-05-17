import { IApiDetails, TransformedRequestData } from "@/schema/http.schema";
import { AxiosBasicCredentials } from "axios";
import { getFormData } from "./get-form-data";
import { getQueryString } from "./get-query-string";

const basicAuth: AxiosBasicCredentials = {
    username: "clientId",
    password: "secret",
};

const getGrantType = { key: "grant_type", value: "password" };

export const transformRequestData = (
    apiDetails: IApiDetails,
    requestData: any
) => {
    const transformedRequestData: TransformedRequestData = {
        data: requestData,
    };

    if (apiDetails.requestAuthType === "NO-AUTH") {
        transformedRequestData.auth = basicAuth;
        transformedRequestData.data = getFormData(requestData);

        if (transformedRequestData.data instanceof FormData)
            transformedRequestData.data.append(
                getGrantType.key,
                getGrantType.value
            );
    }
    switch (apiDetails.requestBodyType) {
        case "FORM-DATA":
            transformedRequestData.data = getFormData(requestData);
            break;
        case "QUERY-STRING":
            transformedRequestData.data = getQueryString(requestData);
            break;
        default:
            transformedRequestData.data = requestData;
            break;
    }

    return transformedRequestData;
};
