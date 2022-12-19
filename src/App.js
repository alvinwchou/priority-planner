import "./styles/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import firebase, { auth } from "./features/firebase/FirebaseConfig";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { useRef } from "react";

function App() {
    const [user, setUser] = useState({});
    const [user2, setUser2] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // check if there is a user logged in, if so update state else clear state
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // we want to have all the data at the top level
                // get user's tasks from db
                const database = getDatabase(firebase);
                const dbRef = ref(database, `users/${currentUser.uid}`);

                const newUser = {
                    user: currentUser,
                    userId: currentUser.uid,
                };

                onValue(dbRef, (res) => {
                    const data = res.val();

                    // the task in each categories are in an object
                    // convert object to an array for easier usage
                    // since tasks are nested in a category and categories are nested in the data
                    // we have to use 2 for in loops
                    for (let category in data) {
                        const newTasksArray = [];

                        for (let key in data[category]) {
                            newTasksArray.push({
                                key: key,
                                task: data[category][key],
                            });
                        }

                        // add to the newUser object
                        newUser[category] = newTasksArray;
                    }
                }).then(setUser(newUser));
            } else {
                // if not user is logged in, navigate to login page
                setUser({});
                navigate("/login");
            }
        });
    }, [navigate]);

    // reset state after user has been logged out
    const logoutUser = () => {
        setUser({});
    };

    // add task to firebase db
    const addTask = (category, task) => {
        const database = getDatabase(firebase);
        // path will be users / user id / category / task
        const dbRef = ref(database, `users/${user.userId}/${category}`);

        push(dbRef, task);
    };

    // delete task from firebase db
    const deleteTask = (categoryName, taskKey) => {
        const database = getDatabase(firebase);
        const dbRef = ref(
            database,
            `users/${user.userId}/${categoryName}/${taskKey}`
        );

        remove(dbRef);
    };

    return (
        <div className="App">
            <Header logoutUser={logoutUser} addTask={addTask} />
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard user={user} deleteTask={deleteTask} />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
