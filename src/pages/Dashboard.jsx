// This will be our dashboard where uses can plan their task after login
import TaskItems from "../components/TaskItems";

const Dashboard = ({ user, addTask, deleteTask, updateLists }) => {
    return (
        <div className="dashboard">
            <div className="dashboardCard priority1">
                <h2>Priority 1</h2>
                <TaskItems
                    tasks={user.planner?.priority1}
                    category={"priority1"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    updateLists={updateLists}
                />
            </div>
            <div className="dashboardCard priority2">
                <h2>Priority 2</h2>
                <TaskItems
                    tasks={user.planner?.priority2}
                    category={"priority2"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    updateLists={updateLists}
                />
            </div>
            <div className="dashboardCard priority3">
                <h2>Priority 3</h2>
                <TaskItems
                    tasks={user.planner?.priority3}
                    category={"priority3"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    updateLists={updateLists}
                />
            </div>
            <div className="dashboardCard notes">
                <h2>Notes</h2>
                <TaskItems
                    tasks={user.planner?.notes}
                    category={"notes"}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    updateLists={updateLists}
                />
            </div>
        </div>
    );
};

export default Dashboard;
