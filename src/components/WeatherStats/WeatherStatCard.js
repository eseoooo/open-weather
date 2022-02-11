import classes from "./WeatherStatCard.module.css";

const WeatherStatCard = (props) => {
	return (
		<div className={classes.WeatherStatCard}>
			<h2>{props.label}</h2>
			<h2>{props.value}</h2>
		</div>
	);
};

export default WeatherStatCard;
