const TaskItems = ({ usersTasks }) => {
    // create empty array to hold the task
    const taskList = [];

    // changing the usersTasks from object to an array
    for (const key in usersTasks) {
        taskList.push({ key: key, task: usersTasks[key] });
    }

    return (
        <div className="taskItems">
            {taskList.map((task) => {
                return <p key={task.key}>{task.task}</p>;
            })}
        </div>
    );
};

export default TaskItems;
