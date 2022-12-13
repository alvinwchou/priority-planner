import { useState } from "react";
import TaskForm from "./TaskForm";

const Header = ({ logoutUser, addTask }) => {
    const [showMenu, setShowMenu] = useState(false);

    const date = new Date();

    // toggle to show / hide menu
    const handleClick = (catcher) => {
        // logoutUser();
        // signOut(auth);
        if (catcher == "toggle" || catcher == "taskForm") {
            setShowMenu(!showMenu);
        }
    };

    return (
        <div className="header">
            <p onClick={() => handleClick("toggle")}>+</p>
            <h1>Daily Planner</h1>
            <p>Date: {date.toDateString()}</p>
            {showMenu && <TaskForm addTask={addTask} catcher={handleClick} />}
        </div>
    );
};

export default Header;
