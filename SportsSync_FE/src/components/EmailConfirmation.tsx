import { useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

function EmailComfirmation() {
    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                await axios.post('http://localhost:8090/confirm-email', { token: params.token });

                navigate('/login');
            }
            catch (error: any) {
                alert(error.response.data);

                navigate('/register');
            }
        };

        confirmEmail();
    }, [navigate, params]);

    return (
        <div>
            <h1>Confirming Email...</h1>
        </div>
    );
}

export default EmailComfirmation;
