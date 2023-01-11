import "./styles/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import firebase, { auth } from "./features/firebase/FirebaseConfig";
import Dashboard from "./pages/Dashboard";
import LoginRegister from "./pages/LoginRegister";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";

function App() {
    const [user, setUser] = useState({
        user: null,
        userId: null,
        planner: {},
    });

    const navigate = useNavigate();

    useEffect(() => {
        // check if there is a user logged in, if so update state else clear state
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // we want to have all the data at the top level
                // get user's tasks from db
                const database = getDatabase(firebase);
                const dbRef = ref(database, `users/${currentUser.uid}`);

                // const newPlannerObject = {};

                onValue(dbRef, (res) => {
                    const data = res.val();

                    setUser({
                        user: currentUser,
                        userId: currentUser.uid,
                        // planner: newPlannerObject,
                        planner: data,
                    });
                });
            } else {
                // if not user is logged in, navigate to login page
                setUser({
                    user: null,
                    userId: null,
                    planner: {},
                });
                navigate("/");
            }
        });
    }, [navigate]);

    // reset state after user has been logged out
    const logoutUser = () => {
        setUser({
            user: null,
            userId: null,
            planner: {},
        });
    };

    // add task to firebase db
    const addTask = (categoryName, task) => {
        const database = getDatabase(firebase);
        // path will be users / user id / categoryName / task
        const dbRef = ref(database, `users/${user.userId}/${categoryName}`);

        const tempArray = [];

        // get current task in the list
        const listedItems = user.planner[categoryName];

        // push all current items in the the temp array
        listedItems?.forEach((item) => {
            tempArray.push(item);
        });

        // push the new task to the temp array
        tempArray.push(task);
        // update the db with new list
        set(dbRef, tempArray);
    };

    // delete task from firebase db
    const deleteTask = (categoryName, taskIndex) => {
        console.log("delete");
        console.log({ categoryName, taskIndex });
        const database = getDatabase(firebase);
        const dbRef = ref(
            database,
            `users/${user.userId}/${categoryName}/${taskIndex}`
        );

        remove(dbRef);
    };

    // update the list to firebase db
    const updateLists = (categoryName, newListOrder) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `users/${user.userId}/${categoryName}`);

        set(dbRef, newListOrder);
    };

    return (
        <div className="App">
            <Header
                userId={user.userId}
                logoutUser={logoutUser}
                addTask={addTask}
            />
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            user={user}
                            addTask={addTask}
                            deleteTask={deleteTask}
                            updateLists={updateLists}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
