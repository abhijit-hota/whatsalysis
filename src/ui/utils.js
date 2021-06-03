// From https://stackoverflow.com/a/16348977/12172493

export const getColorFromString = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let colour = "#";
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		colour += ("00" + value.toString(16)).substr(-2);
	}
	return colour;
};

export const humanizeTime = (val) => {
	const nextNum = ((parseInt(val) + 1) % 24).toString();
	return `${val.padStart(2, 0)}:00 to ${nextNum.padStart(2, 0)}:00`;
};
