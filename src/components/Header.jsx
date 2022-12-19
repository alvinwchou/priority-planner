import { useState } from "react";
import TaskForm from "./TaskForm";

const Header = ({ logoutUser, addTask }) => {
    const [showMenu, setShowMenu] = useState(false);

    const date = new Date();

    // array that holds the class names of acceptable elements to close
    const close = ["toggle", "taskForm", "taskFormClose", "taskFormLogout"];

    // close the menu
    const handleClick = (catcher) => {
        // check if the element is apart of the acceptable class names
        if (close.includes(catcher)) {
            setShowMenu(!showMenu);
        }
    };

    return (
        <div className="header">
            <p onClick={() => handleClick("toggle")}>+</p>
            <h1>Daily Planner</h1>
            <p>Date: {date.toDateString()}</p>
            {showMenu && (
                <TaskForm
                    logoutUser={logoutUser}
                    addTask={addTask}
                    catcher={handleClick}
                />
            )}
        </div>
    );
};

export default Header;
