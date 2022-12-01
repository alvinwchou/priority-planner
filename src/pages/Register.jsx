import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/firebase/FirebaseConfig";
// import { auth } from "../feature/firebase";

const Register = () => {
    // normally I would use state to track user input but I only need the info when the from is submitted. I do not need the component to rerender every time user enters a character
    const nameRef = useRef();
    const emailRef = useRef();
    const passOneRef = useRef();
    const passTwoRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // check if the password match if not alert user
        if (passOneRef.current.value !== passTwoRef.current.value) {
            alert("Passwords do not match");
        } else {
            const registrationInfo = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passOneRef.current.value,
            };

            createUserWithEmailAndPassword(
                auth,
                registrationInfo.email,
                registrationInfo.password
            )
                .then(() => {
                    // route to dashboard after successful registration
                    navigate("/");
                })
                .catch((error) => {
                    // alert user of error
                    alert(error.message);
                });
        }
    };

    return (
        <div className="register">
            <p>Register</p>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        ref={nameRef}
                    />
                </div>
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
                        ref={passOneRef}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="passTwo">Confirm password</label>
                    <input
                        type="password"
                        name="passTwo"
                        id="passTwo"
                        placeholder="Confirm password"
                        ref={passTwoRef}
                    />
                </div>
                <div className="formGroup">
                    <button>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
