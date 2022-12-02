// This will be our dashboard where uses can plan their task after login

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

    // check if there is a user logged in, if not nav to login page
    useEffect(() => {
        if (Object.entries(user).length === 0) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="dashboard">
            <p>Dashboard</p>
            <p>welcome {user.email}</p>
        </div>
    );
};

export default Dashboard;
