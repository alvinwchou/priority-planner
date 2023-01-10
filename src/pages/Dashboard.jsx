// This will be our dashboard where uses can plan their task after login
import { useRef } from "react";
import TaskItems from "../components/TaskItems";

const Dashboard = ({ user, addTask, deleteTask, compareLists, updateLists }) => {
    const priority1Ref = useRef()
    const priority2Ref = useRef()
    const priority3Ref = useRef()
    const notesRef = useRef()
    return (
        <div className="dashboard">
            <div className="dashboardCard priority1" ref={priority1Ref}>
                <h2>Priority 1</h2>
                <TaskItems
                    tasks={user.planner.priority1}
                    category={"priority1"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    compareLists={compareLists}
                    updateLists={updateLists}
                />
            </div>
            <div className="dashboardCard priority2" ref={priority2Ref}>
                <h2>Priority 2</h2>
                <TaskItems
                    tasks={user.planner.priority2}
                    category={"priority2"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    compareLists={compareLists}
                    updateLists={updateLists}
                />
            </div>
            <div className="dashboardCard priority3" ref={priority3Ref}>
                <h2>Priority 3</h2>
                <TaskItems
                    tasks={user.planner.priority3}
                    category={"priority3"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    compareLists={compareLists}
                    updateLists={updateLists}
                />
            </div>
            <div className="dashboardCard notes" ref={notesRef}>
                <h2>Notes</h2>
                <TaskItems
                    tasks={user.planner.notes}
                    category={"notes"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    compareLists={compareLists}
                    updateLists={updateLists}
                />
            </div>
        </div>
    );
};

export default Dashboard;
