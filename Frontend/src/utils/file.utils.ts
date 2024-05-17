import { API_ENDPOINT } from "@/config/api.config";

export const excelFileExtensions = ["xlsx", "xls", "xml", "xlsm", "xlsb"];

export const imageExtensions = ".jpg, .jpeg, .png, .svg";

export const videoExtensions = ".mp4";

export const attachmentExtensions = `${imageExtensions.split(",").map((extension) => `${extension}`)}, .pdf, .doc, .docx, ${excelFileExtensions.map(
	(extension) => `.${extension}, `,
)}`;
