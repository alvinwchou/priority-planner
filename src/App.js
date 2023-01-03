import "./styles/styles.css";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import firebase, { auth } from "./features/firebase/FirebaseConfig";
import Dashboard from "./pages/Dashboard";
import LoginRegister from "./pages/LoginRegister";
import { getDatabase, ref, push, onValue, remove, child, set, update } from "firebase/database";

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

                const newPlannerObject = {};

                onValue(dbRef, (res) => {
                    const data = res.val();

                    console.log(data);

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

                        // add to the newPlannerObject
                        newPlannerObject[category] = newTasksArray;
                    }

                    setUser({
                        user: currentUser,
                        userId: currentUser.uid,
                        planner: newPlannerObject,
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
            console.log(item);
            tempArray.push(item.task);
        });

        // push the new task to the temp array
        tempArray.push(task);

        // update the db with new list
        set(dbRef, tempArray);
    };

    // delete task from firebase db
    const deleteTask = (categoryName, taskKey) => {
        console.log("delete", categoryName);
        const database = getDatabase(firebase);
        const dbRef = ref(
            database,
            `users/${user.userId}/${categoryName}/${taskKey}`
        );

        remove(dbRef);


        // the code below was provided by chatgtp, I was having problems with the DOM not rerendering when the last item task of a list was delete.

        // In this revised example, the deleteTask function removes the task from the Firebase database using the remove() method, and then creates a new copy of the planner object with the task removed using the spread operator and the filter() method. The new object is then passed to the setUser() function to update the state. This causes the component to re-render with the updated state, and the DOM reflects the change to the planner object.

        // Create a new copy of the planner object with the task removed
        const newPlanner = {
            ...user.planner,
            [categoryName]: [...user.planner[categoryName]].filter(
                (task) => task.key !== taskKey
            ),
        };

        // Update the state with the new planner object
        setUser({ ...user, planner: newPlanner });
    };

    const compareLists = (starting, ending) => {
        const database = getDatabase(firebase);
        // console.log(starting.target.parentElement.parentElement.id);
        // const startingCategory = starting.target.parentElement.parentElement.id;
        // const startingCategoryList = starting.target.parentElement.children
        // console.log(startingCategoryList);

        const currentLists = document.querySelectorAll(".taskItems")
        console.log(currentLists);

        const planner = {}

        // for each list we will get the name of the category it is under
        currentLists.forEach((list) => {
            console.log("category", list.id);
            // get the category name
            const categoryName = list.id;

            // getting node list of task
            const currentList = list.children;
            console.log(currentList);

            const tempArray = [];

            const dbRef = ref(database, `users/${user.userId}/${categoryName}`);

            for (let child of currentList) {
                // console.log(child.id, child.innerText);
                const key = child.id
                const task = child.innerText
                // currentListArray.push({[key]: task});
                console.log({categoryName, key, task});
                // obj[key] = task
                tempArray.push(task)
                   // update(dbRef, [key] = task);
            }
            set(dbRef, tempArray)
            // planner[categoryName] = obj
            // console.log(currentListArray);

            
            
            
            // console.log(user.planner[categoryName]);

            // planner[categoryName] = currentListArray
        });

        console.log("PLANNER", planner);



        // update list
        // path will be users / user id / categoryName / task
        const dbRef = ref(database, `users/${user.userId}/`);

        // set(dbRef, planner);






    }

    return (
        <div className="App">
            <Header userId={user.userId} logoutUser={logoutUser} addTask={addTask} />
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route
                    path="/dashboard"
                    element={<Dashboard user={user} deleteTask={deleteTask} compareLists={compareLists}/>}
                />
            </Routes>
        </div>
    );
}

export default App;
