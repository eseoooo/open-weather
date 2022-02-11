import { useState, useEffect } from "react";
import { average } from "../../helpers";
import WeatherStatCard from "./WeatherStatCard";
import classes from "./WeatherStats.module.css";

const WeatherStats = (props) => {
	const [minTemperature, setMinTemperature] = useState(null);
	const [maxTemperature, setMaxTemperature] = useState(null);
	const [modeTemperature, setModeTemperature] = useState(null);
	const [meanTemperature, setMeanTemperature] = useState(null);
	const { weatherForecastStats } = props;

	useEffect(() => {
		const allTemperatures = weatherForecastStats.reduce((previous, current) => {
			const { temperature } = current;
			previous.push(...Object.values(temperature));
			return previous;
		}, []);

		//get temperature frequency
		const temperatureFrequencies = allTemperatures.reduce(
			(accumlator, current) => {
				if (accumlator[current]) accumlator[current]++;
				if (!accumlator[current]) accumlator[current] = 1;
				return accumlator;
			},
			{}
		);

		// get mode or most frequent temperature
		const frequentTemperature = Object.entries(temperatureFrequencies).reduce(
			(previous, current) => {
				if (current[1] > previous[1]) previous = current.slice();
				return previous;
			},
			[0, 0]
		);

		setMeanTemperature(average(...allTemperatures) || 0);
		setMaxTemperature(Math.max(...allTemperatures));
		setMinTemperature(Math.min(...allTemperatures));
		setModeTemperature(frequentTemperature[0])
	}, [weatherForecastStats]);
	return (
		<div className={classes.WeatherStats}>
			<WeatherStatCard label="High" value={maxTemperature} />
			<WeatherStatCard label="Low" value={minTemperature} />
			<WeatherStatCard label="Mean" value={meanTemperature} />
			<WeatherStatCard label="Mode" value={modeTemperature} />
		</div>
	);
};

export default WeatherStats;
