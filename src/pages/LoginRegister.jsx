import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import { auth } from "../features/firebase/FirebaseConfig";

const LoginRegister = ({ userId }) => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [registrationForm, setRegistrationForm] = useState({
        email: "",
        passOne: "",
        passTwo: "",
    });
    const [isRegister, setIsRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // if there is userId then route to dashboard
        if (userId) {
            navigate("/dashboard");
        }
    }, [userId, navigate]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const loginInfo = {
            email: loginForm.email,
            password: loginForm.password,
        };

        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            .then(() => {
                // route to events page after successful log in
                navigate("/dashboard");
            })
            .catch((error) => {
                // alert user of error
                if (error.message) {
                    setErrorMessage(error.message);
                }
            });
    };

    const handleChangeLogin = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setLoginForm({ ...loginForm, [itemName]: itemValue });
    };

    const handleChangeRegister = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        setRegistrationForm({ ...registrationForm, [itemName]: itemValue });
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        // check if the password match if not alert user
        if (registrationForm.passOne !== registrationForm.passTwo) {
            setErrorMessage("Passwords do not match");
        } else {
            const registrationInfo = {
                // name: registerNameRef.current.value,
                email: registrationForm.email,
                password: registrationForm.passOne,
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
                    if (error.message) {
                        setErrorMessage(error.message);
                    }
                });
        }
    };

    return isRegister ? (
        <div className="register">
            <form onSubmit={handleSubmitRegister}>
                <h2>Register</h2>
                <div className="formGroup">
                    {/* <label htmlFor="name">Enter your name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        ref={registerNameRef}
                    /> */}
                </div>
                <div className="formGroup">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        // placeholder="Enter your email"
                        // ref={registerEmailRef}
                        onChange={handleChangeRegister}
                        value={registrationForm.email}
                    />
                    <label
                        htmlFor="email"
                        className={registrationForm.email && "notEmpty"}
                    >
                        Enter your email
                    </label>
                    {errorMessage ===
                        "Firebase: Error (auth/invalid-email)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                    {errorMessage ===
                        "Firebase: Error (auth/email-already-in-use)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                </div>
                <div className="formGroup">
                    <input
                        type="password"
                        name="passOne"
                        id="passOne"
                        // placeholder="Enter password"
                        // ref={registerPassOneRef}
                        onChange={handleChangeRegister}
                        value={registrationForm.passOne}
                    />
                    <label
                        htmlFor="passOne"
                        className={registrationForm.passOne && "notEmpty"}
                    >
                        Enter password
                    </label>
                    {errorMessage ===
                        "Firebase: Error (auth/internal-error)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                    {errorMessage === "Passwords do not match" && (
                        <FormError errorMessage={errorMessage} />
                    )}
                </div>
                <div className="formGroup">
                    <input
                        type="password"
                        name="passTwo"
                        id="passTwo"
                        // placeholder="Confirm password"
                        // ref={registerPassTwoRef}
                        onChange={handleChangeRegister}
                        value={registrationForm.passTwo}
                    />
                    <label
                        htmlFor="passTwo"
                        className={registrationForm.passTwo && "notEmpty"}
                    >
                        Confirm password
                    </label>
                    {errorMessage === "Passwords do not match" && (
                        <FormError errorMessage={errorMessage} />
                    )}
                </div>
                <div className="formGroup">
                    <button>Register</button>
                </div>
                <div className="formGroup">
                    <button
                        onClick={() => {
                            setIsRegister(false);
                            setErrorMessage(null);
                            setRegistrationForm({
                                email: "",
                                passOne: "",
                                passTwo: "",
                            });
                        }}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <div className="login">
            <form onSubmit={handleSubmitLogin}>
                <h2>Login</h2>
                <div className="formGroup">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        // placeholder="Enter your email"
                        // ref={loginEmailRef}
                        onChange={handleChangeLogin}
                        value={loginForm.email}
                    />
                    <label
                        htmlFor="email"
                        className={loginForm.email && "notEmpty"}
                    >
                        Email
                    </label>
                    {errorMessage ===
                        "Firebase: Error (auth/invalid-email)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                    {errorMessage ===
                        "Firebase: Error (auth/user-not-found)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                </div>
                <div className="formGroup">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        // placeholder="Enter password"
                        // ref={loginPasswordRef}
                        onChange={handleChangeLogin}
                        value={loginForm.password}
                    />
                    <label
                        htmlFor="password"
                        className={loginForm.password && "notEmpty"}
                    >
                        Password
                    </label>
                    {errorMessage ===
                        "Firebase: Error (auth/internal-error)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                    {errorMessage ===
                        "Firebase: Error (auth/wrong-password)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                    {errorMessage ===
                        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." && (
                        <FormError errorMessage={errorMessage} />
                    )}
                </div>
                <div className="formGroup">
                    <button>Enter</button>
                </div>
                <div className="formGroup">
                    <button
                        onClick={() => {
                            setIsRegister(true);
                            setErrorMessage(null);
                            setLoginForm({ email: "", password: "" });
                        }}
                    >
                        Create an Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginRegister;
