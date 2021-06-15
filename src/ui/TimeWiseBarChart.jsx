import React from "react";
import { Bar } from "react-chartjs-2";
import { humanizeTime } from "./utils";

const TimeWiseBarChart = ({ timeStats }) => {
	const labels = Object.keys(timeStats);
	const data = Object.values(timeStats);

	return (
		<Bar
			options={{
				indexAxis: "y",
				aspectRatio: 0.85,
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
			data={{
				labels: labels.map(humanizeTime),
				datasets: [
					{
						minBarLength: 10,
						label: "Messages sent",
						data,
						backgroundColor: ["#25D366"],
						hoverOffset: 4,
						tension: 0.1,
					},
				],
			}}
		/>
	);
};

export default TimeWiseBarChart;
