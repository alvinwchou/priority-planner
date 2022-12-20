import { signOut } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/firebase/FirebaseConfig";

const TaskForm = ({ logoutUser, addTask, catcher }) => {
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
            alert(`Too many task, please delete before adding to ${category}`)
        }
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
                navigate("/login");
            })
            .catch((err) => alert(err.message));
    };


    const isThereRoomForTask = (category) => {
        // selecting the category card 
        const dashboardCardElement = document.querySelector(`.${category}`)

        // selecting the taskItems element in side the category element
        const taskItemsElement = document.querySelector(`.${category} .taskItems`)

        // selecting the taskItem element in side the taskItems element
        const taskItemElement = document.querySelector(`.${category} .taskItem`)

        // getting the bottom position of category card
        const dashboardCardElementBottom =
            dashboardCardElement.getBoundingClientRect().bottom

        // getting the bottom position of the last task in the category card
        const taskItemsElementBottom =
            taskItemsElement.getBoundingClientRect().bottom;

        const taskItemElementHeight =
            taskItemElement.getBoundingClientRect().height;

            console.log(taskItemElement.getBoundingClientRect());

        console.log({
            dashboardCardElementBottom,
            taskItemsElementBottom,
            taskItemElementHeight,
        });

        // if the difference between the bottom of the category card and the bottom of the taskitems is less then the height of the individual item. not enough space to add more task
        // return true if there is space
        return ((dashboardCardElementBottom - taskItemsElementBottom) > taskItemElementHeight)
    }


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
                            <option value="priority1">Priority 1</option>
                            <option value="priority2">Priority 2</option>
                            <option value="priority3">Priority 3</option>
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
                            required
                        ></textarea>
                    </div>
                    <div className="formGroup">
                        <button>Submit</button>
                    </div>
                </form>
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
