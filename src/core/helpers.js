import { ignoredWords, whatsappChatEvents } from "./constants";

export const getEvent = (str) => {
	for (const eventType in whatsappChatEvents) {
		const regex = whatsappChatEvents[eventType];
		const matches = str.match(regex);
		if (matches) {
			return { type: eventType, values: matches.groups };
		}
	}
	if (
		str.trim() ===
		"Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more."
	) {
		return { type: "meta", values: { announcement: str.trim() } };
	}
	throw new Error("Invalid event");
};

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
