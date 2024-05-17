import { IGenericPaginatedRequest } from "./http.schema";

export interface ICourseContent {
	id: number;
	title: string;
	description: string | null;
	duration: string;
}

export interface ICourse extends ICourseContent {
	price: number;
	likes?: number; // number of likes
	sections?: number; // number of course sections
	lectures?: number; // number of course lectures
	duration: string; // duration of the course in minutes
	instructors?: ICourseInstructor[];
	thumbnailPath: string;
}

export interface ICourseDetails extends ICourseContent {
	price: number;
	thumbnailPath: string;
	content: ICourseSection[];
	tutors: ICourseInstructor[];
}

export interface ICourseInstructor {
	id: number;
	name: string;
}

export interface ICourseSection extends ICourseContent {
	content: ICourseLecture[];
}

export interface ICourseLecture extends ICourseContent {
	locked: boolean;
	previewLink: string;
}

export interface ICourseSetRequest {
	id?: number;
	title: string;
	description: string;
	price: number;
	duration: string;
	thumbnail?: string;
	tutors: string;
	deletedTutorsId: { id: number }[];
}

export interface ICourseLecturesCreateRequest {
	courseId: number;
	courseLectures: {
		id?: number;
		title: string;
		description?: string;
		contentType: CourseContentEnum.COURSE;
		duration: string;
		lectures: {
			id?: number;
			title: string;
			description?: string;
			locked: boolean;
			contentType: CourseContentEnum.LECTURE;
			previewLink: string;
			lectureKey: number;
		}[];
	}[];
}

export enum CourseContentEnum {
	COURSE = "COURSE",
	LECTURE = "LECTURE",
	RESOURCE = "RESOURCE",
}

export interface ICoursesGetRequest extends IGenericPaginatedRequest {
	name?: string;
}

export interface IInstructorsGetRequest extends IGenericPaginatedRequest {
	name?: string;
}
