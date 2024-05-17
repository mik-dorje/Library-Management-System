export const capitalizeFirstLetter = (str: string) => {
	if (!str) {
		return "";
	}

	const strArr = str.split("");
	strArr[0] = strArr[0].toUpperCase();
	return strArr.join("");
};

export const normalizeString = (str: string) => {
	return str.toLowerCase().trim();
};

export function urlify(paragraph: any) {
	const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;

	const linkedParagraph = paragraph?.replace(urlRegex, (url: any) => {
		if (url.startsWith("http://") || url.startsWith("https://")) {
			return `<a href="${url}" target="_blank">${url}</a>`;
		}
		return `<a href="http://${url}" target="_blank">${url}</a>`;
	});

	return { __html: linkedParagraph };
}

export const addCommas = (value: number | string = 0) => {
	const val = typeof value === "string" ? Number(value) : value;

	if (typeof val !== "number") {
		return "";
	}

	return new Intl.NumberFormat("en-IN").format(val);
};

export const wordCount = (text: string) =>
	text?.trim()?.split(/\s+/)?.filter(Boolean)?.length;

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const isCharUpperCase = (char: string = "") => {
	if (char.length > 1) {
		return -1;
	}

	return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
};

export const singularOrPlural = (
	count: number,
	singularStr: string,
	pluralStr: string,
) => {
	return count === 0 || count > 1 ? pluralStr : singularStr;
};
