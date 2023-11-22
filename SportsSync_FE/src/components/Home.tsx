import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('emailAddress');

        navigate('/login');
    };

    return (
        <div>
        <h1>{localStorage.getItem('emailAddress')}</h1>
        <button onClick={logout}>
            Logout
        </button>
        </div>
    );
}

export default Home;