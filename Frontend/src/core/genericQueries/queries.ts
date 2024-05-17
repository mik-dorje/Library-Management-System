import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";
import { IVideoUploadRequest } from "@/schema/video.schema";
import { RcFile } from "antd/es/upload";

const { postAttachments, postOtherFiles, postImageFile } =
	protectedApiList.generic;

interface IFileUploadRequest {
	file: string | RcFile | undefined;
	name: string;
	description: string;
}

export const usePostAttachments = () => {
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(postAttachments, {
				requestData,
			});
		},
		onError: (error) => {
			message.error(error.message);
		},
	});
};

export const usePostFiles = () => {
	return useMutation({
		mutationFn: (requestData: IFileUploadRequest) => {
			return performApiAction(postOtherFiles, {
				requestData,
			});
		},
		onError: (error) => {
			message.error(error.message);
		},
	});
};
export const usePostImageFile = () => {
	return useMutation({
		mutationFn: (requestData: IFileUploadRequest) => {
			return performApiAction(postImageFile, {
				requestData,
			});
		},
		onError: (error) => {
			message.error(error.message);
		},
	});
};
