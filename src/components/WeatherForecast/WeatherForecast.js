import classes from "./WeatherForecast.module.css";
import { useState, useEffect, useRef } from "react";
import WeatherForecastCard from "./WeatherForecastCard";
import { getNextFiveDays, kelvinToCelsius } from "../../helpers";
import WeatherForecastSpecialCard from "./WeatherForecastSpecialCard";

const WeatherForecast = (props) => {
	const [currentCoordinates, setCurrentCoordinates] = useState([]);
	const [currentTemperature, setCurrentTemperature] = useState(null);
	const [currentHumidity, setCurrentHumidity] = useState(null);
	const [forecast, setForecast] = useState([]);
	const [city, setCity] = useState(null);
	const isMounted = useRef(false);

	const { setWeatherForecastStats } = props;

	// get current user's current location or set to default location on error
	useEffect(() => {
		const defaultLocation = [49.8077774, -97.1646835]; //Winnipeg, MB
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setCurrentCoordinates([latitude, longitude]);
			},
			() => {
				setCurrentCoordinates(defaultLocation);
			}
		);
	}, []);

	// fetch weather when coordinates update
	useEffect(() => {
		const [latitude, longitude] = currentCoordinates;
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=e56fd901f9df3bd8616caf56d0c20212`;

		//prevent useEffect from running on first mount
		if (isMounted.current) {
			(async () => {
				try {
					const response = await fetch(url);
					const forecastData = await response.json();

					const { daily: dailyForecastData } = forecastData;
					const { current: currentForecastData } = forecastData;

					setCurrentTemperature(kelvinToCelsius(currentForecastData.temp));
					setCurrentHumidity(currentForecastData.humidity);
					setCity(forecastData.timezone.split("/")[1]);

					//parse data
					const fiveDayWeatherForecast = getNextFiveDays().map(
						(currentDay, index) => {
							const dayForecastData = dailyForecastData[index];
							const { humidity } = dayForecastData;
							const temperaturesInK = { ...dayForecastData.temp };
							const temperaturesInC = {};

							// convert temperatures to Celsius
							for (const dayTime in temperaturesInK) {
								temperaturesInC[dayTime] = kelvinToCelsius(
									temperaturesInK[dayTime]
								);
							}

							return {
								humidity,
								temperature: { ...temperaturesInC },
								day: { ...currentDay.day },
							};
						}
					);
					setForecast(fiveDayWeatherForecast);
					setWeatherForecastStats(fiveDayWeatherForecast);
				} catch (error) {
					alert(
						"An error has occured while fetching forecast. Please reload the page!"
					);
				}
			})();
		} else isMounted.current = true;
	}, [currentCoordinates, setWeatherForecastStats]);

	return (
		<div className={classes.WeatherForecast}>
			{forecast.map((dayForecast, index) => {
				if (index === 0) {
					return (
						<WeatherForecastSpecialCard
							weatherForecast={dayForecast}
							curTemperature={currentTemperature}
							curHumidity={currentHumidity}
							city={city}
							key={index}
						/>
					);
				}
				return (
					<WeatherForecastCard weatherForecast={dayForecast} key={index} />
				);
			})}
		</div>
	);
};

export default WeatherForecast;
