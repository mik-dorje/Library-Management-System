import {
    IApiDetails,
    RequestAuthType,
    RequestMethodEnum,
} from "@/schema/http.schema";

const auth: { [key: string]: IApiDetails } = {
    signUserIn: {
        controllerName: "/auth",
        requestMethod: RequestMethodEnum.POST,
        queryKeyName: "SIGN_USER_IN",
        requestAuthType: RequestAuthType.NOAUTH,
    },
};

export default auth;
