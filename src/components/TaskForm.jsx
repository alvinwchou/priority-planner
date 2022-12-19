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

        addTask(category, task);

        // reset the form
        taskRef.current.value = "";
    };

    // event listener for when user clicks outside the form to close form
    const handleClick = (e) => {
        console.log(e.target.className);
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
                            <option value="" disabled selected>
                                Choose a Category
                            </option>
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
