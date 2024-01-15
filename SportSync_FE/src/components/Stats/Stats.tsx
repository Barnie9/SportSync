// CSS
import StatsCSS from "./Stats.module.css";

// Interfaces
import Rating from "../../interfaces/Rating";

interface Props {
	rating?: Rating;
}

function Stats({ rating }: Props) {
	return (
		<div className={StatsCSS.statistics_container}>
			<div className={StatsCSS.stats_container}>
				<p>Pace </p>
				<p>{rating?.pace}</p>
			</div>
			<div className={StatsCSS.stats_container}>
				<p>Shooting </p>
				<p>{rating?.shooting}</p>
			</div>
			<div className={StatsCSS.stats_container}>
				<p>Passing </p>
				<p>{rating?.passing}</p>
			</div>
			<div className={StatsCSS.stats_container}>
				<p>Dribbling </p>
				<p>{rating?.dribbling}</p>
			</div>
			<div className={StatsCSS.stats_container}>
				<p>Defending </p>
				<p>{rating?.defending}</p>
			</div>
			<div className={StatsCSS.stats_container}>
				<p>Physical </p>
				<p>{rating?.physical}</p>
			</div>
		</div>
	);
}

export default Stats;
