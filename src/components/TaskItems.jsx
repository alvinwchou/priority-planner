import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { RxDragHandleHorizontal } from "react-icons/rx";

const TaskItems = ({ tasks, category, deleteTask }) => {
    const [isDragging, setIsDragging] = useState(null);

    const handleClickRemove = (taskKey) => {
        deleteTask(category, taskKey);
    };

    const handleDragStart = (task) => {
        // e.target.classList.add("isDragging");
        setIsDragging(task);
    };

    const handleDragEnd = () => {
        // e.target.classList.remove("isDragging");
        setIsDragging(null);

        // // grabbing the list of items where the task was grabbed from
        // const firstChildren = [... taskItemsRef.current.children]
        // const firstArray = []
        // firstChildren.forEach(child => {
        //     firstArray.push(child.innerText)
        // })
        // console.log(firstArray);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        // find the category that the task is being hovered over
        const taskItemsRef = e.target.closest(".taskItems");

        // find out what task is below the current task being selected / hovered based on the position of mouse
        const bottomTask = insertAboveTask(taskItemsRef, e.clientY);

        // get the current task which being dragged
        const currentTask = document.querySelector(".isDragging");

        if (!bottomTask) {
            // if there is no current bottomTask then we append it to the bottom of the category list
            taskItemsRef.appendChild(currentTask);
        } else {
            taskItemsRef.insertBefore(currentTask, bottomTask);
        }

        // const secondChildren = [... taskItemsRef.current.children]
        // const secondArray = [];
        // secondChildren.forEach((child) => {
        //     secondArray.push(child.innerText);
        // });
        // console.log(secondArray);
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
        <div className="taskItems" onDragOver={handleDragOver}>
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
