import { META_REGEX } from "./constants.js";
import { getEvent, getTimeKey, isValidMessage, isValidWord } from "./helpers.js";

export function parseText(text) {
	const arr = text.split(META_REGEX);

	const allMessages = [];
	const allEvents = [];

	for (let i = 1; i < arr.length; i += 3) {
		const event = getEvent(arr[i + 2]);
		if (event.type === "message") {
			allMessages.push({
				date: arr[i],
				time: arr[i + 1],
				...event.values,
			});
		} else {
			allEvents.push({
				type: event.type,
				...event.values,
			});
		}
	}

	return { allMessages, allEvents };
}

export function getCountData(parsedMessages) {
	return parsedMessages.reduce(
		(count, { sender, time }) => {
			const timeKey = getTimeKey(time);
			count.senderWise[sender] = (count.senderWise[sender] || 0) + 1;
			count.timeWise[timeKey] = (count.timeWise[timeKey] || 0) + 1;
			return count;
		},
		{ senderWise: {}, timeWise: {} }
	);
}

export function getAllValidWords(parsedMessages) {
	return parsedMessages.flatMap(({ message: _message }) => {
		const message = _message.trim();
		if (isValidMessage(message)) {
			const words = message.split(/[^a-zA-Z]/).flatMap((_word) => {
				const word = _word.toLowerCase();
				if (isValidWord(word)) return word;
				return [];
			});
			return words;
		}
		return [];
	});
}
export function getSortedWordCount(allWords) {
	const wordMap = allWords.reduce((acc, word) => {
		acc[word] = (acc[word] || 0) + 1;
		return acc;
	}, {});
	const sortedWords = Object.entries(wordMap).sort(([, countA], [, countB]) => countB - countA);
	return sortedWords;
}
