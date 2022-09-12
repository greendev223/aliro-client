import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import InputForm from "../components/common/InputForm/InputForm";
// import { useApi } from "../contexts/ApiProvider";


interface Data {
    email: string
    password: string
    repeatPassword: string
}

const initialState: Data = {
    email: "",
    password: "",
    repeatPassword: "",
}

type dataKey = keyof Data;

export default function RegisterPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)

    const handleUpdate = (field: string, value: string) => {
        setData(data => ({ ...data, [field as dataKey]: value }));
    }

    const validate = () => {

        let validated = true;
        let msg: Data = { email: '', password: '', repeatPassword: '' };
        if (!data.email || !data.email.includes('@')) {
            msg.email = 'Please enter a valid email address';
            validated = false;
        }
        if (!data.password) {
            msg.password = 'Please enter your password';
            validated = false;
        }
        if (!data.repeatPassword) {
            msg.repeatPassword = 'Please reenter your password';
            validated = false;
        }
        if (data.password && data.repeatPassword && data.repeatPassword !== data.password) {
            msg.repeatPassword = "Passwords don't match";
            validated = false;
        }
        setValidationMsg(msg);
        return validated
    }

    const handleRegister = async () => {

        if (!validate()) {
            return
        }

        const requestData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": data.email,
                "password": data.password
            })
        }

        try {
            const res = await fetch('/api/register', requestData);
            if (res.status !== 200) {
                console.log(res)
                alert('Error registering user.')
                return false
            }
            // const data = await res.json();
        } catch (error) {
            console.error(error)
        }

        localStorage.setItem("email", data.email);
        navigate('/login');
    }

    return (
        <div className="login-page">
            <div className="login-form">
                <h3 style={{ marginBottom: 5 }}>REGISTER</h3>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <InputForm
                        name="email"
                        type="email"
                        label="Email"
                        value={data.email}
                        onChange={handleUpdate}
                        error={validationMsg.email} />
                </div>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <InputForm
                        name="password"
                        type="password"
                        label="Password"
                        value={data.password}
                        onChange={handleUpdate}
                        error={validationMsg.password} />
                </div>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <InputForm
                        name="repeatPassword"
                        type="password"
                        label="Repeat password"
                        value={data.repeatPassword}
                        onChange={handleUpdate}
                        error={validationMsg.repeatPassword} />
                </div>
                <p style={{ fontSize: 12 }}>
                    Already have an account? &nbsp;
                    <Link className="a-link" style={{ marginBottom: 10 }} to='/login'>
                        Sign in
                    </Link>
                </p>
                <button
                    className="button"
                    style={{ width: 250, alignSelf: 'center' }}
                    onClick={handleRegister}>
                    REGISTER
                </button>
            </div>
        </div>
    )
}