import "./styles/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { auth } from "./features/firebase/FirebaseConfig";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        // check if there is a user logged in, if so update state else clear state
        onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser({});
            }
        });
    }, []);

    // reset state after user has been logged out
    const logoutUser = () => {
        setUser({});
    };

    return (
        <>
            <Router>
                <div className="App">
                    <Header logoutUser={logoutUser} />
                    <Routes>
                        <Route path="/" element={<Dashboard user={user} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
