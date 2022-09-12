import { useNavigate } from "react-router-dom";
import InputForm from "../components/common/InputForm/InputForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";


interface Data {
    email: string
    password: string
}

const initialState: Data = {
    email: "",
    password: ""
}

type dataKey = keyof Data;

export default function LoginPage() {
    const { login } = useUser();
    const navigate = useNavigate();
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)
    // const location = useLocation();

    const handleUpdate = (field: string, value: string) => {
        setData(data => ({ ...data, [field as dataKey]: value }));
    }

    const validate = () => {

        let validated = true;
        let msg = { email: '', password: '' };
        if (!data.email || !data.email.includes('@')) {
            msg.email = 'Please enter a valid email address';
            validated = false;
        }

        if (!data.password) {
            msg.password = 'Please enter your password';
            validated = false;
        }
        setValidationMsg(msg);
        return validated
    }

    const handleSignIn = async () => {

        if (!validate()) {
            return
        }
        
        const response = await login(data.email, data.password);        
        if (response.ok) {
            let next = "/";
            // if (location.state && location.state.next) {
            //     next = location.state.next
            // }
            navigate(next)
        }
        else alert('Invalid user name or password')
    }

    return (
        <div className="login-page">
            <div className="login-form">
                <h3 style={{ marginBottom: 5 }}>SIGN IN</h3>
                <div style={{ marginTop: 10 }}>
                    <InputForm
                        name="email"
                        type="email"
                        label="Email"
                        value={data.email}
                        onChange={handleUpdate}
                        error={validationMsg.email} />
                </div>
                <div style={{ marginTop: 20, marginBottom: 10 }}>
                    <InputForm
                        name="password"
                        type="password"
                        label="Password"
                        value={data.password}
                        onChange={handleUpdate}
                        error={validationMsg.password} />
                </div>
                <p style={{ fontSize: 12 }}>
                    Don't have an account? &nbsp;
                    <Link className="a-link" style={{ marginBottom: 10 }} to='/register'>
                        Register here
                    </Link>
                </p>
                <button
                    className="button"
                    style={{ width: 250, alignSelf: 'center' }}
                    onClick={handleSignIn}>
                    SIGN IN
                </button>

            </div>
        </div>
    )
}

