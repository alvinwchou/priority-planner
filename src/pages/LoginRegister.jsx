import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/firebase/FirebaseConfig";

const LoginRegister = () => {
    const [isRegister, setIsRegister] = useState(false);
    // normally I would use state to track user input but I only need the info when the from is submitted. I do not need the component to rerender every time user enters a character
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();

    const registerNameRef = useRef();
    const registerEmailRef = useRef();
    const registerPassOneRef = useRef();
    const registerPassTwoRef = useRef();

    const navigate = useNavigate();

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const loginInfo = {
            email: loginEmailRef.current.value,
            password: loginPasswordRef.current.value,
        };

        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            .then(() => {
                // route to events page after successful log in
                navigate("/dashboard");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        // check if the password match if not alert user
        if (
            registerPassOneRef.current.value !==
            registerPassTwoRef.current.value
        ) {
            alert("Passwords do not match");
        } else {
            const registrationInfo = {
                name: registerNameRef.current.value,
                email: registerEmailRef.current.value,
                password: registerPassOneRef.current.value,
            };

            createUserWithEmailAndPassword(
                auth,
                registrationInfo.email,
                registrationInfo.password
            )
                .then(() => {
                    // route to dashboard after successful registration
                    navigate("/dashboard");
                })
                .catch((error) => {
                    // alert user of error
                    alert(error.message);
                });
        }
    };

    return isRegister ? (
        <div className="register">
            <form onSubmit={handleSubmitRegister}>
                <h2>Register</h2>
                <div className="formGroup">
                    <label htmlFor="name">Enter your name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        // placeholder="Enter your name"
                        ref={registerNameRef}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Enter your email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        // placeholder="Enter your email"
                        ref={registerEmailRef}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="passOne">Enter password</label>
                    <input
                        type="password"
                        name="passOne"
                        id="passOne"
                        // placeholder="Enter password"
                        ref={registerPassOneRef}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="passTwo">Confirm password</label>
                    <input
                        type="password"
                        name="passTwo"
                        id="passTwo"
                        // placeholder="Confirm password"
                        ref={registerPassTwoRef}
                    />
                </div>
                <div className="formGroup">
                    <button>Register</button>
                </div>
                <div className="formGroup">
                    <button onClick={() => setIsRegister(false)}>Back</button>
                </div>
            </form>
        </div>
    ) : (
        <div className="login">
            <form onSubmit={handleSubmitLogin}>
                <h2>Login</h2>
                <div className="formGroup">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        // placeholder="Enter your email"
                        ref={loginEmailRef}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="passOne">
                        Password
                    </label>
                    <input
                        type="password"
                        name="passOne"
                        id="passOne"
                        // placeholder="Enter password"
                        ref={loginPasswordRef}
                    />
                </div>
                <div className="formGroup">
                    <button>Enter</button>
                </div>
                <div className="formGroup">
                    <button onClick={() => setIsRegister(true)}>
                        Create an Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginRegister;
