import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../features/firebase/FirebaseConfig";
import TaskForm from "./TaskForm";

const Header = ({ logoutUser, addTask }) => {
    const [showMenu, setShowMenu] = useState(false);

    // toggle to show / hide menu
    const handleClick = () => {
        // logoutUser();
        // signOut(auth);
        setShowMenu(!showMenu);
    };

    return (
        <div className="header">
            <p onClick={handleClick}>+</p>
            <h1>Daily Planner</h1>
            <p>Date: Today's date</p>
            {showMenu && <TaskForm addTask={addTask} />}
        </div>
    );
};

export default Header;
