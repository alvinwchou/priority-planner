import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/firebase/FirebaseConfig";

const Login = () => {
    // normally I would use state to track user input but I only need the info when the from is submitted. I do not need the component to rerender every time user enters a character
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginInfo = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            .then(() => {
                // route to events page after successful log in
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="login">
            <p>Login</p>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        ref={emailRef}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="passOne">Password</label>
                    <input
                        type="password"
                        name="passOne"
                        id="passOne"
                        placeholder="Enter password"
                        ref={passwordRef}
                    />
                </div>
                <div className="formGroup">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
