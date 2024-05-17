import { IApiDetails, Primitive } from "@/schema/http.schema";

export const sanitizeController = (
    apiDetail: IApiDetails,
    pathVariables?: { [key: string]: Primitive }
) => {
    return pathVariables && Object.keys(pathVariables).length
        ? {
              ...apiDetail,
              controllerName: Object.entries(pathVariables).reduce(
                  // eslint-disable-next-line no-return-assign, no-param-reassign
                  (acc, [key, value]) =>
                      // eslint-disable-next-line no-return-assign, no-param-reassign
                      (acc = acc.replace(`{${key}}`, value?.toString())),
                  apiDetail.controllerName
              ),
          }
        : apiDetail;
};
