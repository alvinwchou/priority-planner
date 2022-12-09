import "./styles/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import firebase, { auth } from "./features/firebase/FirebaseConfig";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getDatabase, ref, push } from "firebase/database";

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

    // add task to firebase db
    const addTask = (category, task) => {
        const database = getDatabase(firebase);
        // path will be user id / category / task
        const dbRef = ref(database, `${user.uid}/${category}`);

        push(dbRef, task);
    };

    return (
        <>
            <Router>
                <div className="App">
                    <Header logoutUser={logoutUser} addTask={addTask} />
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
