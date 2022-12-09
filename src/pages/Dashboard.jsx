// This will be our dashboard where uses can plan their task after login

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../features/firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState } from "react";
import TaskItems from "../components/TaskItems";

const Dashboard = ({ user }) => {
    const [usersTasks, setUsersTasks] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // check if there is a user logged in, if not nav to login page
        if (Object.entries(user).length === 0) {
            navigate("/login");
        } else {
            //get user's tasks from db
            const database = getDatabase(firebase);
            const dbRef = ref(database, user.uid);

            onValue(dbRef, (res) => {
                setUsersTasks(res.val());
            });
        }
    }, [user, navigate]);

    return (
        <div className="dashboard">
            <p>Dashboard</p>
            <p>welcome {user.email}</p>
            <div className="priority2">
                <h2>Priority 1</h2>
                <TaskItems usersTasks={usersTasks["priority1"]} />
            </div>
            <div className="priority1">
                <h2>Priority 2</h2>
                <TaskItems usersTasks={usersTasks["priority2"]} />
            </div>
            <div className="priority3">
                <h2>Priority 3</h2>
                <TaskItems usersTasks={usersTasks["priority3"]} />
            </div>
            <div className="notes">
                <h2>Notes</h2>
                <TaskItems usersTasks={usersTasks["notes"]} />
            </div>
        </div>
    );
};

export default Dashboard;
