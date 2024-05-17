export const romanNumeralList: string[][] = [
	["", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], // Ones
	["", "x", "xx", "xxx", "xl", "l", "lx", "lxx", "lxxx", "xc"], // Tens
	["", "c", "cc", "ccc", "cd", "d", "dc", "dcc", "dccc", "cM"], // Hundreds
];

export const NumberToRoman = (num: number): string => {
	const numeralArr: string[] = [];
	const digits = num.toString().split("").map(Number); // Convert string digits to numbers
	digits.forEach((digit, i) => {
		numeralArr.push(romanNumeralList[i][digit]);
	});
	return numeralArr.reverse().join("");
};
