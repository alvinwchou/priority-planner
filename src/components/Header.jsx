import { useState } from "react";
import TaskForm from "./TaskForm";

const Header = ({ userId, logoutUser, addTask }) => {
    const [showMenu, setShowMenu] = useState(false);

    const date = new Date();

    // array that holds the class names of acceptable elements to close
    const close = ["toggle", "taskForm", "taskFormClose", "taskFormLogout"];

    // close the menu
    const handleClick = (catcher) => {
        // check if the element is apart of the acceptable class names and there is a user logged in
        if (userId && close.includes(catcher)) {
            setShowMenu(!showMenu);
        }
    };

    return (
        <div className="header">
            <div>
                <button onClick={() => handleClick("toggle")}>
                    <h1>+</h1>
                </button>
            </div>
            <h1 className="title">Daily Planner</h1>
            <h2 className="todaysDate">Date: {date.toDateString()}</h2>
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
