import { defaults } from "chart.js";
import React, { useState } from "react";
import { parseText, getCountData, getAllValidWords, getSortedWordCount } from "../core";
import { Box, VizContainer, AppContainer, Heading } from "./commonents/Box";
import SenderWisePieChart from "./SenderWisePieChart";
import TimeWiseBarChart from "./TimeWiseBarChart";

defaults.font.family = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
"Droid Sans", "Helvetica Neue", sans-serif`;

function App() {
	const [loaded, setLoaded] = useState(false);
	const [allEvents, setAllEvents] = useState([]);
	const [senderWiseCount, setSenderWiseCount] = useState({});
	const [timeWiseCount, setTimeWiseCount] = useState({});
	const [wordsCount, setWordsCount] = useState([]);

	const handleCount = (e) => {
		const textFile = e.target?.files[0];
		const reader = new FileReader();

		reader.addEventListener("loadend", ({ target: { readyState, result } }) => {
			console.time("process");

			const { allMessages, allEvents } = parseText(result);
			setAllEvents(allEvents);

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
		<AppContainer>
			<Box style={{ textAlign: "center" }}>
				<Heading style={{ fontSize: "3em" }}>WhatsApp Text Analyzer</Heading>
				<label htmlFor="text-data">Select your WhatsApp Export</label>
				<input type="file" name="text-data" id="text-data" accept="text/plain" onChange={handleCount} />
			</Box>
			<VizContainer>
				{loaded && (
					<>
						<Box>
							<SenderWisePieChart senderStats={senderWiseCount} />
						</Box>
						<Box>
							<TimeWiseBarChart timeStats={timeWiseCount} />
						</Box>
						<Box>
							<Heading>Most Used Words</Heading>
							{wordsCount.slice(0, 20).map(([word, count]) => (
								<div className="count" key={word}>
									<strong>{word}</strong>
									<span>{count}</span>
								</div>
							))}
						</Box>
						<Box>
							<Heading>Group Names</Heading>
							{allEvents
								.filter(({ type }) => type === "subjectChange")
								.slice(-20)
								.map(({ changer, from, to }) => (
									<div className="count" key={changer + from + to}>
										<strong>{changer}</strong>
										<span>{to}</span>
									</div>
								))}
						</Box>
					</>
				)}
			</VizContainer>
		</AppContainer>
	);
}

export default App;
