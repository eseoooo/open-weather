import WeatherForecast from "../WeatherForecast/WeatherForecast";
import WeatherStats from "../WeatherStats/WeatherStats";
import classes from "./Layout.module.css";
import { useState } from "react";

const Layout = (props) => {
	const [forecastStats, setForecastStats] = useState([]);

	return (
		<div className={classes.Layout}>
			<div className={classes["Layout__container"]}>
				<WeatherForecast setWeatherForecastStats={setForecastStats} />
				<h2>5-Day Weather Statistics</h2>
				<WeatherStats weatherForecastStats={forecastStats} />
			</div>
		</div>
	);
};

export default Layout;
