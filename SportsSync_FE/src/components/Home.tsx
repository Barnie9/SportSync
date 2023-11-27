import { useNavigate } from "react-router-dom";
import './style/Home.css';

function Home() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('emailAddress');

        navigate('/login');
    };

    return (
        <div>
            <div className="home-container">
                <nav>
                    <div className="nav-container">
                        <div className="logo">
                                <p>Sports</p>
                        </div>
                        <div className="middle-buttons">
                                <a></a>
                        </div>
                        <div className="right-buttons">

                        </div>

                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Home;