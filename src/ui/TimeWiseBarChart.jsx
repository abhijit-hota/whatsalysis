import React from "react";
import { Line } from "react-chartjs-2";
import { getColorFromString } from "./utils";

const TimeWiseBarChart = ({ timeStats }) => {
	const labels = Object.keys(timeStats);
	const data = Object.values(timeStats);

	return (
		<Line
			data={{
				labels,
				datasets: [
					{
						minBarLength: 10,
						label: "Time Wise Statistics",
						data,
						backgroundColor: labels.map(getColorFromString),
						hoverOffset: 4,
						tension: 0.1
					},
				],
			}}
		/>
	);
};

export default TimeWiseBarChart;
