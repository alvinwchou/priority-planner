import { useRef } from "react";

const TaskForm = ({ addTask, catcher }) => {
    const categoryRef = useRef();
    const taskRef = useRef();

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
        catcher(e.target.className);
    };

    return (
        <div className="taskForm" onClick={(e) => handleClick(e)}>
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
        </div>
    );
};

export default TaskForm;
