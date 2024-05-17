import { create } from "zustand";

import { IConversionLogItem, IUploadingVideo } from "@/schema/video.schema";

interface IVideoState {
	conversionLogs: IConversionLogItem[];
	setConversionLogs: (logs: IConversionLogItem[]) => void;
	isConversionInProgress: boolean;
	setIsConversionInProgress: (isConversionInProgress: boolean) => void;
	uploadingVideosList: IUploadingVideo[];
	setUploadingVideosList: (uploadingVideosList: IUploadingVideo[]) => void;
	removeUploadingVideo: (videoUid: string) => void;
}

const useVideoStore = create<IVideoState>((set) => {
	return {
		conversionLogs: [],
		setConversionLogs: (logs) => {
			set(() => {
				return { conversionLogs: logs };
			});
		},
		isConversionInProgress: false,
		setIsConversionInProgress: (isConversionInProgress) => {
			set(() => {
				return { isConversionInProgress };
			});
		},
		uploadingVideosList: [],
		setUploadingVideosList: (uploadingVideosList) => {
			set(() => {
				return { uploadingVideosList };
			});
		},
		removeUploadingVideo: (videoUid) => {
			set((state) => {
				return {
					uploadingVideosList: state.uploadingVideosList.filter(
						(video) => video.id !== videoUid,
					),
				};
			});
		},
	};
});

export default useVideoStore;
