import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// CSS
import HomeCSS from "./Home.module.css";

// Components
import Menu from "../../components/Menu/Menu";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Home({ onChangeUsername }: Props) {
	return (
		<>
			<div className={HomeCSS.page}>
				<Menu selectedPage="Home" onChangeUsername={onChangeUsername} />
			</div>
		</>
	);
}

export default Home;
