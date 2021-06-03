import { defaults } from "chart.js";
import React, { useState } from "react";
import { parseMessagesFromText, getCountData, getAllValidWords, getSortedWordCount } from "../core";
import SenderWisePieChart from "./SenderWisePieChart";
import TimeWiseBarChart from "./TimeWiseBarChart";

defaults.font.family = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
"Droid Sans", "Helvetica Neue", sans-serif`;

function App() {
	const [loaded, setLoaded] = useState(false);
	const [senderWiseCount, setSenderWiseCount] = useState({});
	const [timeWiseCount, setTimeWiseCount] = useState({});
	const [wordsCount, setWordsCount] = useState([]);

	const handleCount = (e) => {
		const textFile = e.target?.files[0];
		const reader = new FileReader();

		reader.addEventListener("loadend", ({ target: { readyState, result } }) => {
			console.time("process");

			const { allMessages, allEvents } = parseMessagesFromText(result);
			const count = getCountData(allMessages);

			setSenderWiseCount(count.senderWise);
			setTimeWiseCount(count.timeWise);

			const allWords = getAllValidWords(allMessages);
			const sortedWordCount = getSortedWordCount(allWords);

			setWordsCount(sortedWordCount);
			console.timeEnd("process");
			setLoaded(true);
		});

		reader.readAsText(textFile);
	};
	return (
		<div className="app">
			<h1>WhatsApp Text Analyzer</h1>
			<div className="input">
				<label htmlFor="text-data">Select your WhatsApp Export</label>
				<input type="file" name="text-data" id="text-data" accept="text/plain" onChange={handleCount} />
			</div>
			{loaded && (
				<div className="charts">
					<div id="sender-chart">
						<SenderWisePieChart senderStats={senderWiseCount} />
					</div>
					<div id="time-chart">
						<TimeWiseBarChart timeStats={timeWiseCount} />
					</div>
					<div id="words">
						<h3>Most Used Words</h3>
						{wordsCount.slice(0, 20).map(([word, count]) => (
							<div className="count" key={word}>
								<strong>{word}</strong>
								<span>{count}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
