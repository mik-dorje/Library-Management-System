import { RcFile } from "antd/es/upload";

export interface IVideoListResponse {
	fileName: string[];
}

export enum VideoConversionStatusEnum {
	STARTED = "STARTED",
	COMPLETED = "COMPLETED",
	PENDING = "PENDING",
}

export interface IVideo {
	id: number;
	path: string;
	name: string;
	description: string | null;
	video_conversion_status: VideoConversionStatusEnum;
}

export enum VideoTypeEnum {
	UPLOADED = "UPLOADED",
	CONVERTED = "CONVERTED",
}

export interface IVideoUploadRequest {
	videoUid: string;
	video: string | RcFile | undefined;
	name?: string;
	description?: string;
}

export interface IConversionLogItem {
	timestamp: string;
	message: string;
}

export interface IUploadingVideo {
	id: string;
	title: string;
}
