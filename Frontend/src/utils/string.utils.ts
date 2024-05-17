import { Primitive } from "@/schema/http.schema";

export const convertStrIntoSlug = (str: string = "") => {
	return str.toLowerCase().split(" ").join("-");
};

export const insertPathVariables = (
	baseStr: string,
	pathVariables: { [key: string]: Primitive },
) => {
	return Object.entries(pathVariables).reduce(
		// eslint-disable-next-line no-return-assign
		(acc, [key, value]) =>
			// eslint-disable-next-line no-param-reassign
			(acc = acc.replace(`{${key}}`, value.toString())),
		baseStr,
	);
};

export const singularOrPlural = (
	count: number,
	singularStr: string,
	pluralStr: string,
) => {
	return count === 0 || count > 1 ? pluralStr : singularStr;
};
