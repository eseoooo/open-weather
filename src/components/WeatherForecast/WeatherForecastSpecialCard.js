
import { IoSunnySharp } from "react-icons/io5";
import { IoPartlySunnySharp } from "react-icons/io5";
import { MdOutlineNightlightRound } from "react-icons/md";
import classes from "./WeatherForecastSpecialCard.module.css";

const WeatherForecastSpecialCard = (props) => {
	const forecast = props.weatherForecast;
	const { weekDay, date, month } = forecast.day;
	const { night, morn, day, max, min } = forecast.temperature;
	return (
		<div className={classes.WeatherForecastSpecialCard}>
			<h4>
				{date} {month}, {weekDay}
			</h4>
			<h2>{props.city}</h2>
			<h1>{props.curTemperature}</h1>
			<h4>
				{min}
				<span> ~ </span>
				{max}
			</h4>
			<h4>Humidity: {props.curHumidity}%</h4>

			<div className={classes["WeatherForecastSpecialCard__temperature"]}>
				<div>
					<IoSunnySharp />
					<h5>Morning</h5>
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

export default WeatherForecastSpecialCard;
