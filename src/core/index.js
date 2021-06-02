import { META_REGEX } from "./constants.js";
import { getTimeKey, isValidMessage, isValidWord } from "./helpers.js";

export function parseMessagesFromText(result) {
	return result.split(META_REGEX).reduce((res, val, i, _arr) => {
		if (val.trim() !== "" && (i - 1) % 4 === 0) {
			res.push({
				date: _arr[i],
				time: _arr[i + 1],
				sender: _arr[i + 2],
				message: _arr[i + 3].trim(),
			});
		}
		return res;
	}, []);
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
	return parsedMessages.flatMap(({ message }) => {
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
