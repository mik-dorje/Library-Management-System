import dayjs from "dayjs";

import { singularOrPlural } from "./string.utils";

export const breakNumIntoTime = (duration: number) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	let timeStr = "";

	if (hours === 0) {
		timeStr = `${minutes} ${singularOrPlural(minutes, "min", "mins")}`;
	} else {
		timeStr = `${hours} ${singularOrPlural(hours, "hr", "hrs")}`;

		if (minutes !== 0) {
			timeStr += `, ${minutes} ${singularOrPlural(
				minutes,
				"min",
				"mins",
			)}`;
		}
	}

	return timeStr;
};

export const getMonthNameFromYearAndMonth = (year: number, month: number) => {
	const date = dayjs(`${year}-${month}-01`);
	const monthName = date.format("MMMM");

	return monthName;
};
