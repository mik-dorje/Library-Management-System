import {
	RequestAuthType,
	RequestBodyType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const otherFilesPrefix = "files/others";
const imagePrefix = "files/image";

const generic = {
	postAttachments: {
		controllerName: "/temporary-attachments/temp",
		requestMethod: RequestMethodEnum.POST,
		requestBodyType: RequestBodyType.FORMDATA,
		queryKeyName: "POST_TEMPORARY_ATTACHMENTS",
	},
	postOtherFiles: {
		controllerName: otherFilesPrefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "POST_FILES",
		requestBodyType: RequestBodyType.FORMDATA,
		requestAuthType: RequestAuthType.AUTH,
	},
	postImageFile: {
		controllerName: imagePrefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "POST_IMAGE_FILES",
		requestBodyType: RequestBodyType.FORMDATA,
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default generic;
