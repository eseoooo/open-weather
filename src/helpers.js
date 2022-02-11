//prettier-ignore
const MONTHS = ["January","February","March","April","May","June","July",
                    "August","September","October","November","December"]
//prettier-ignore
const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_TO_MILLISECONDS = 86400000;

const formatDate = (dateValue) => {
	const now = new Date(dateValue);
	const weekDay = WEEK_DAYS[now.getDay()];
	const month = MONTHS[now.getMonth()];
	const year = now.getFullYear();
	const date = now.getDate();

	return { day: { weekDay, month, year, date } };
};

export const getNextFiveDays = () => {
	// return array of objects of next five days
	const result = [];
	const { day: currentDay } = formatDate(Date.now());

	const currentDayInMilliseconds = new Date(
		`${currentDay.weekDay} ${currentDay.month} ${currentDay.date} ${currentDay.year}`
	).getTime();

	let nextDayInMilliseconds = currentDayInMilliseconds;
	for (let i = 0; i < 5; i++) {
		result.push(formatDate(nextDayInMilliseconds));
		nextDayInMilliseconds += DAY_TO_MILLISECONDS;
	}

	return result;
};

export const kelvinToCelsius = (temperature) => {
	return +(temperature - 273.15).toFixed(0);
};

export const average = (...values) => {
	const n = values.length;
	const sum = values.reduce((previous, current) => {
		return previous + current;
	}, 0);
	return +(sum / n).toFixed(0);
};
