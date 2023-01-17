import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/firebase/FirebaseConfig";

const TaskForm = ({ logoutUser, addTask, deleteTask, catcher }) => {
    const categoryRef = useRef();
    const taskRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const category = categoryRef.current.value;
        const task = taskRef.current.value;

        if (isThereRoomForTask(category)) {
            // add task to db
            addTask(category, task);

            // reset the form
            taskRef.current.value = "";
        } else {
            alert(`Too many task, please delete before adding to ${category}`);
        }

        taskRef.current.focus();
    };

    // submit the form when user hits enter and focus inside textarea
    const handleKeyDownTextarea = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    // remove all task from user
    const handleClickClearList = () => {
        deleteTask();
    };

    // event listener for when user clicks outside the form to close form
    const handleClick = (e) => {
        catcher(e.target.className);
    };

    const handleClickLogout = () => {
        signOut(auth)
            .then(() => {
                // after successfully logging user out, nav to login page
                logoutUser();
                navigate("/");
            })
            .catch((err) => alert(err.message));
    };

    const isThereRoomForTask = (category) => {
        // selecting the category card
        const dashboardCardElement = document.querySelector(`.${category}`);

        // selecting the taskItem element in side the taskItems element
        const taskItemElement = document.querySelectorAll(
            `.${category} .taskItem`
        );

        // getting the bottom position of category card
        const dashboardCardElementBottom =
            dashboardCardElement.getBoundingClientRect().bottom;

        // getting the hight of the task, 15 is default hight if there is no task yet
        const taskItemElementHeight =
            taskItemElement?.[0]?.getBoundingClientRect().height || 15;

        // getting the bottom position of the last task in the category card, 100 is default bottom position if there is no task
        const taskItemElementBottom =
            taskItemElement?.[
                taskItemElement.length - 1
            ]?.getBoundingClientRect().bottom || 100;

        // if the difference between the bottom of the category card and the bottom of the last task is less then the height of the individual item. not enough space to add more task
        // return true if there is space
        // the - 15 is from the padding
        return (
            dashboardCardElementBottom - taskItemElementBottom - 15 >
            taskItemElementHeight
        );
    };

    return (
        <div className="taskForm" onClick={(e) => handleClick(e)}>
            <div className="taskFormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="category" className="sr-only">
                            Choose a category
                        </label>
                        <select
                            name="category"
                            id="category"
                            ref={categoryRef}
                            required
                        >
                            <option value="priority1">Top Priorities </option>
                            <option value="priority2">Reminders</option>
                            <option value="priority3">To do</option>
                            <option value="notes">Notes</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="task"></label>
                        <textarea
                            name="task"
                            id="task"
                            cols="30"
                            rows="10"
                            ref={taskRef}
                            onKeyDown={handleKeyDownTextarea}
                            required
                        ></textarea>
                    </div>
                    <div className="formGroup">
                        <button>Submit</button>
                    </div>
                </form>
                <div className="formGroup formGroupFooter">
                    <button
                        className="taskFormClearList"
                        onClick={handleClickClearList}
                    >
                        Clear All List
                    </button>
                </div>
                <div className="formGroup formGroupFooter">
                    <button
                        className="taskFormLogout"
                        onClick={handleClickLogout}
                    >
                        Logout
                    </button>
                    <button className="taskFormClose">Close</button>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
