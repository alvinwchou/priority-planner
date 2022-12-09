import { useRef } from "react";

const TaskForm = ({ addTask }) => {
    const categoryRef = useRef();
    const taskRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const category = categoryRef.current.value;
        const task = taskRef.current.value;

        addTask(category, task);

        // reset the form
        categoryRef.current.value = "priority1";
        taskRef.current.value = "";
    };

    return (
        <div className="taskForm">
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="category">Choose a category</label>
                    <select name="category" id="category" ref={categoryRef}>
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
