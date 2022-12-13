import { RiCloseFill } from "react-icons/ri";

const TaskItems = ({ tasks, category, deleteTask }) => {
    // create empty array to hold the task
    const taskList = [];

    const handleClickRemove = (taskKey) => {
        deleteTask(category, taskKey);
    };

    return (
        <div className="taskItems">
            {tasks?.map((task) => {
                return (
                    <div className="taskItem">
                        <p key={task.key}>{task.task}</p>
                        <button
                            className="btn"
                            onClick={() => handleClickRemove(task.key)}
                        >
                            <RiCloseFill />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskItems;
