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
				<div className={StatsCSS.text}>Pace </div>
				<div className={StatsCSS.number}>{rating?.pace}</div>
			</div>
			<div className={StatsCSS.stats_container}>
				<div className={StatsCSS.text}>Shooting </div>
				<div className={StatsCSS.number}>{rating?.shooting}</div>
			</div>
			<div className={StatsCSS.stats_container}>
				<div className={StatsCSS.text}>Passing </div>
				<div className={StatsCSS.number}>{rating?.passing}</div>
			</div>
			<div className={StatsCSS.stats_container}>
				<div className={StatsCSS.text}>Dribbling </div>
				<div className={StatsCSS.number}>{rating?.dribbling}</div>
			</div>
			<div className={StatsCSS.stats_container}>
				<div className={StatsCSS.text}>Defending </div>
				<div className={StatsCSS.number}>{rating?.defending}</div>
			</div>
			<div className={StatsCSS.stats_container}>
				<div className={StatsCSS.text}>Physical </div>
				<div className={StatsCSS.number}>{rating?.physical}</div>
			</div>
		</div>
	);
}

export default Stats;
