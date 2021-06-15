import { defaults } from "chart.js";
import React, { useState } from "react";
import { parseText, getCountData, getAllValidWords, getSortedWordCount } from "../core";
import { Box, VizContainer, Heading, HStack, SecondaryText } from "./Commonents";
import SenderWisePieChart from "./SenderWisePieChart";
import TimeWiseBarChart from "./TimeWiseBarChart";
import Logo from "../assets/logo.png";
import DateWiseChart from "./DateWiseChart";
defaults.font.family = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
"Droid Sans", "Helvetica Neue", sans-serif`;

function App() {
	const [loaded, setLoaded] = useState(false);

	const [allEvents, setAllEvents] = useState([]);
	const [extremeDates, setExtremeDates] = useState({});
	const [senderWiseCount, setSenderWiseCount] = useState({});
	const [timeWiseCount, setTimeWiseCount] = useState({});
	const [dateWiseCount, setDateWiseCount] = useState({});
	const [wordsCount, setWordsCount] = useState([]);

	const runCore = (text) => {
		const { allMessages, allEvents } = parseText(text);
		setExtremeDates({
			firstDate: allMessages[0].date,
			lastDate: allMessages[allMessages.length - 1].date,
		});
		setAllEvents(allEvents);

		const count = getCountData(allMessages);
		setSenderWiseCount(count.senderWise);
		setTimeWiseCount(count.timeWise);
		setDateWiseCount(count.dateWise);

		const allWords = getAllValidWords(allMessages);
		const sortedWordCount = getSortedWordCount(allWords);
		setWordsCount(sortedWordCount);
		setLoaded(true);
	};

	const handleFileInput = (e) => {
		const textFile = e.target?.files[0];
		const reader = new FileReader();

		reader.addEventListener("loadend", ({ target: { readyState, result } }) => {
			console.time("process");
			try {
				runCore(result);
			} catch (error) {
				alert("An error occured. Please make sure you're using a proper export.");
				console.error(error);
			}
			console.timeEnd("process");
		});

		reader.readAsText(textFile);
	};
	const subjectsChanges = allEvents.filter(({ type }) => type === "subjectChange");

	const groupName =
		subjectsChanges[subjectsChanges.length - 1]?.to ??
		allEvents.find(({ type }) => type === "groupCreated")?.name ??
		Object.keys(senderWiseCount).join(" - ");

	return (
		<>
			<Box style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
				{!loaded && <img src={Logo} alt="WhatsAlysis Logo" />}
				<Heading style={{ fontSize: "3em", textAlign: "center" }} as="h1">
					WhatsApp Chat Analysis
				</Heading>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<input
						type="file"
						title="Select your WhatsApp Export"
						placeholder="Select your WhatsApp Export"
						name="text-data"
						id="text-data"
						accept="text/plain"
						onChange={handleFileInput}
					/>
				</div>
				<br />
				<SecondaryText>
					Select your WhatsApp Export
					<br />
					Not sure what to do? Check <a href="https://github.com/abhijit-hota/whatsalysis#how-to-use">
						this
					</a>{" "}
					for instructions
				</SecondaryText>
			</Box>
			{loaded && (
				<Heading style={{ textAlign: "center" }}>
					Analysis of <b>{groupName}</b> from <b>{extremeDates.firstDate}</b> to{" "}
					<b>{extremeDates.lastDate}</b>
				</Heading>
			)}
			{loaded && (
				<VizContainer>
					<Box>
						<Heading>
							Total Messages Sent: <b>{Object.values(senderWiseCount).reduce((acc, val) => acc + val)}</b>
						</Heading>
						<SenderWisePieChart senderStats={senderWiseCount} />
					</Box>
					<Box>
						<Heading>Hourly Messaging Activity</Heading>
						<TimeWiseBarChart timeStats={timeWiseCount} />
					</Box>
					<Box fullWidth>
						<Heading>Daywise Messaging Activity</Heading>
						<DateWiseChart dateStats={dateWiseCount} />
					</Box>
					<Box>
						<Heading>Most Used Words</Heading>
						{wordsCount.slice(0, 20).map(([word, count]) => (
							<HStack key={word} hover>
								<b>{word}</b>
								<span>{count}</span>
							</HStack>
						))}
					</Box>
					{subjectsChanges.length > 0 && (
						<Box>
							<HStack>
								<Heading>Last 20 Group Names</Heading>
								<SecondaryText>
									Total number of changes: <b>{subjectsChanges.length}</b>
								</SecondaryText>
							</HStack>
							{subjectsChanges.slice(-20).map(({ changer, from, to }) => (
								<HStack key={changer + from + to} hover>
									<b>{changer}</b>
									<span>{to}</span>
								</HStack>
							))}
						</Box>
					)}
				</VizContainer>
			)}
		</>
	);
}

export default App;
