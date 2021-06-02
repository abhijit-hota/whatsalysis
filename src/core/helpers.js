import { ignoredWords } from "./constants";

export const getTimeKey = (timeStr) => {
	const hour = parseInt(timeStr.split(":")[0]);
	if (timeStr.includes("m")) {
		const isAM = timeStr.split(" ")[1] === "am";
		if (isAM && hour === 12) {
			return 0;
		} else if (!isAM && hour !== 12) {
			return hour + 12;
		}
		return hour;
	}
	return hour;
};

export const isValidMessage = (message) =>
	message !== "<Media omitted>" && message !== "" && message !== "This message was deleted";

export const isValidWord = (word) => word && !ignoredWords.includes(word) && word.length > 3;
