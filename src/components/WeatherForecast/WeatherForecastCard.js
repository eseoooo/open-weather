import { average } from "../../helpers";
import { IoSunnySharp } from "react-icons/io5";
import { IoPartlySunnySharp } from "react-icons/io5";
import classes from "./WeatherForecastCard.module.css";
import { MdOutlineNightlightRound } from "react-icons/md";

const WeatherForecastCard = (props) => {
	const forecast = props.weatherForecast;
	const humidity = forecast.humidity;
	const { weekDay, date, month } = forecast.day;
	const { night, morn, day, eve, max, min } = forecast.temperature;
    const averageDailyTemp = average(night, morn, day, eve)
    

	return (
		<div className={classes.WeatherForecastCard}>
			<h2>{weekDay}</h2>
			<h3>
				{date} {month}
			</h3>
			<h1>{averageDailyTemp}</h1>
			<h4>
				{min}
				<span> ~ </span>
				{max}
			</h4>
			<h4>Humidity: {humidity}%</h4>

			<div className={classes["WeatherForecastCard__temperature"]}>
				<div>
					<IoSunnySharp />
					<h5>Morn</h5>
					<h4>{morn}</h4>
				</div>

				<div>
					<IoPartlySunnySharp />
					<h5>Day</h5>
					<h4>{day}</h4>
				</div>

				<div>
					<MdOutlineNightlightRound />
					<h5>Night</h5>
					<h4>{night}</h4>
				</div>
			</div>
		</div>
	);
};

export default WeatherForecastCard;
