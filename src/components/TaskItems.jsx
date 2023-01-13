import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { RxDragHandleHorizontal } from "react-icons/rx";

const TaskItems = ({ tasks, category, deleteTask, updateLists }) => {
    const [isDragging, setIsDragging] = useState(null);
    const [startingCategoryElement, setStartingCategoryElement] =
        useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [currentTaskRef, setCurrentTaskRef] = useState(null);

    // const taskItemsRef = useRef();

    const handleClickRemove = (taskIndex) => {
        deleteTask(category, taskIndex);
    };

    const handleDragStart = (e, taskIndex) => {
        // setting state to the task index
        setIsDragging(taskIndex);

        // keep track of the selected task id
        setSelectedTaskId(e.target.id);
        // keep track of which list we started with
        // setStartingCategoryName(e.target.parentElement.id);
        setStartingCategoryElement(e.target.parentElement);
    };

    const handleDragEnd = (e) => {
        setIsDragging(null);

        const startingCategoryName = startingCategoryElement.id;
        const endingCategoryName = e.target.parentElement.id;

        // getting the children of the list being hovered over
        let listedItems = e.target.parentElement.children;

        let tempArray = [];

        // push the task in to tempArray
        for (let item of listedItems) {
            tempArray.push(item.innerText);
        }

        // if the task is within the same list
        if (startingCategoryName === endingCategoryName) {
            // update db with the new order of list (tempArray)
            updateLists(endingCategoryName, tempArray);
        } else {
            // move task to a differnet list
            // move task back to original list before we can delete it
            // if not we would get an error:
            // Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
            startingCategoryElement.appendChild(currentTaskRef);
            // delete task from original list
            deleteTask(startingCategoryName, selectedTaskId);
            // add task to hovered list
            updateLists(endingCategoryName, tempArray);

            // I was getting TypeError: tasks.map is not a function
            // found out that after deleting the task, the array holding the tasks
            // would have a null at the index where the task was removed
            // my solution is to update the list again 
            // getting the children of the original list
            listedItems = startingCategoryElement.children;

            tempArray = [];

            // push the task in to tempArray
            for (let item of listedItems) {
                tempArray.push(item.innerText);
            }
            // the last index is the item being dragged away
            // we need to delete it from the array
            tempArray.pop()
            updateLists(startingCategoryName, tempArray);
        }
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

        // "free" drag and drop
        if (!bottomTask) {
            // if there is no current bottomTask then we append it to the bottom of the category list
            taskItemsRef.appendChild(currentTask);
        } else {
            taskItemsRef.insertBefore(currentTask, bottomTask);
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
            id={category}
            onDragOver={handleDragOver}
            // ref={taskItemsRef}
        >
            {tasks?.map((task, index) => {
                return (
                    <div
                        className={`taskItem ${
                            isDragging === index && "isDragging"
                        }`}
                        key={index}
                        id={index}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={(e) => handleDragEnd(e)}
                        draggable
                    >
                        <p>
                            <RxDragHandleHorizontal /> {task}
                        </p>
                        <button
                            className="btn"
                            onClick={() => handleClickRemove(index)}
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
