import { useState } from "react";
import { useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { RxDragHandleHorizontal } from "react-icons/rx";

const TaskItems = ({ tasks, category, deleteTask }) => {
    const [isDragging, setIsDragging] = useState(null);

    const taskItemsRef = useRef();

    const handleClickRemove = (taskKey) => {
        deleteTask(category, taskKey);
    };

    const handleDragStart = (task) => {
        // e.target.classList.add("isDragging");
        setIsDragging(task);
    };

    const handleDragEnd = (e) => {
        // e.target.classList.remove("isDragging");
        setIsDragging(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        // find out what task is below the current task being selected / hovered based on the position of mouse
        const bottomTask = insertAboveTask(taskItemsRef.current, e.clientY);

        // get the current div which being dragged
        const currentTask = document.querySelector(".isDragging");

        if (!bottomTask) {
            // if there is no current bottomTask then we append it to the bottom of the category list
            taskItemsRef.current.appendChild(currentTask);
        } else {
            taskItemsRef.current.insertBefore(currentTask, bottomTask);
        }
    };

    const insertAboveTask = (category, mouseY) => {
        //get all tasks in the category that does not have the isDragging class
        const tasksElement = category.querySelectorAll(
            ".taskItem:not(.isDragging)"
        );

        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        tasksElement.forEach((task) => {
            // getting the top position of each task
            const { top } = task.getBoundingClientRect();

            // finding the difference from each top position and current mouse position
            const offset = mouseY - top;

            // offset < 0 means we are above the task and we want the closest task we are above
            if (offset < 0 && offset > closestOffset) {
                // set the new closesOffset to the current offset
                closestOffset = offset;
                closestTask = task;
            }
        });

        return closestTask;
    };

    return (
        <div
            className="taskItems"
            onDragOver={handleDragOver}
            ref={taskItemsRef}
        >
            {tasks?.map((task) => {
                return (
                    <div
                        className={`taskItem ${
                            isDragging === task.key && "isDragging"
                        }`}
                        key={task.key}
                        onDragStart={() => handleDragStart(task.key)}
                        onDragEnd={handleDragEnd}
                        draggable
                    >
                        <p>
                            <RxDragHandleHorizontal /> {task.task}
                        </p>
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
