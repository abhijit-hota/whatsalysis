import React from "react";
import { Line } from "react-chartjs-2";

const DateWiseChart = ({ dateStats }) => {
	const labels = Object.keys(dateStats);
	const data = Object.values(dateStats);

	return (
		<Line
			options={{
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
			data={{
				labels: labels,
				datasets: [
					{
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

export default DateWiseChart;
