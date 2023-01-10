import { useState, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { RxDragHandleHorizontal } from "react-icons/rx";

const TaskItems = ({
    tasks,
    category,
    addTask,
    deleteTask,
    compareLists,
    updateLists,
}) => {
    const [isDragging, setIsDragging] = useState(null);
    const taskItemsRef = useRef();

    // const [startingList, setStartingList] = useState(null)
    const [startingCategoryName, setStartingCategoryName] = useState(null);
    const [startingCategoryElement, setStartingCategoryElement] =
        useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [currentTaskRef, setCurrentTaskRef] = useState(null);

    const handleClickRemove = (taskKey) => {
        deleteTask(category, taskKey);
    };

    const handleDragStart = (e, taskKey) => {
        // setting state to the task key
        setIsDragging(taskKey);

        // keep track of the task selected
        setSelectedTask(e.target.innerText);
        // keep track of the selected task id
        setSelectedTaskId(e.target.id);
        // keep track of which list we started with
        setStartingCategoryName(e.target.parentElement.id);
        setStartingCategoryElement(e.target.parentElement);
    };

    const handleDragEnd = (e) => {
        setIsDragging(null);

        const endingCategoryName = e.target.parentElement.id;

        // move task back to original list before we can delete it
        // if not we would get an error:
        // Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
        startingCategoryElement.appendChild(currentTaskRef);

        // delete task from original list
        deleteTask(startingCategoryName, selectedTaskId);

        // add task to hovered list
        addTask(endingCategoryName, selectedTask);

        // side note for when I come back and try to implement the free drag and drop and not just the appendChild

        // case 1 moved within same list (start above line 55)
        // get the new order push to a temp array
        // create a function set to db

        // case 2 move to a new list (start from line 55 const endingCategoryName)
        // get the new order from the hovered list
        // push to temp array
        // append currentTaskRef back to original list
        // deleteTask
        // create a function to set to db
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        // find the category that the task is being hovered over
        const taskItemsRef = e.target.closest(".taskItems");

        // find out what task is below the current task being selected / hovered based on the position of mouse
        const bottomTask = insertAboveTask(taskItemsRef, e.clientY);

        // get the current task which being dragged
        const currentTask = document.querySelector(".isDragging");

        // set state to currentTask for reference
        setCurrentTaskRef(currentTask);

        // append current task to bottom of hovered list
        taskItemsRef.appendChild(currentTask);

        // "free" drag and drop
        // if (!bottomTask) {
        //     // if there is no current bottomTask then we append it to the bottom of the category list
        //     taskItemsRef.appendChild(currentTask);
        // } else {
        //     taskItemsRef.insertBefore(currentTask, bottomTask);
        // }
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
            id={category}
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
                        id={task.key}
                        onDragStart={(e) => handleDragStart(e, task.key)}
                        onDragEnd={(e) => handleDragEnd(e)}
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
