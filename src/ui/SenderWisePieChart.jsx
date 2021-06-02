import React from "react";
import { Pie } from "react-chartjs-2";
import { getColorFromString } from "./utils";

const SenderWisePieChart = ({ senderStats }) => {
	const labels = Object.keys(senderStats);
	const data = Object.values(senderStats);

	return (
		<Pie
			data={{
				labels,
				datasets: [
					{
						label: "Sender Wise Statistics",
						data,
						backgroundColor: labels.map(getColorFromString),
						hoverOffset: 4,
					},
				],
			}}
			options={{
				aspectRatio: 1,
			}}
		/>
	);
};

export default SenderWisePieChart;
