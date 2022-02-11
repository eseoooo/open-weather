import Layout from "./components/Layout/Layout";
import classes from './App.module.css'

const App = (props) => {
	return (
		<section className={classes.App}>
			<h2 className={classes["App__logo"]}>Open Weather</h2>
			<Layout />
		</section>
	);
};

export default App;
