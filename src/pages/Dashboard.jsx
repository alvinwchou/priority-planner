// This will be our dashboard where uses can plan their task after login
import TaskItems from "../components/TaskItems";

const Dashboard = ({ user, deleteTask }) => {
    return (
        <div className="dashboard">
            {/* <p>Dashboard</p>
            <p>welcome {user.email}</p> */}
            <div className="dashboardCard priority1">
                <h2>Priority 1</h2>
                <TaskItems
                    tasks={user.priority1}
                    category={"priority1"}
                    deleteTask={deleteTask}
                />
            </div>
            <div className="dashboardCard priority2">
                <h2>Priority 2</h2>
                <TaskItems
                    tasks={user.priority2}
                    category={"priority2"}
                    deleteTask={deleteTask}
                />
            </div>
            <div className="dashboardCard priority3">
                <h2>Priority 3</h2>
                <TaskItems
                    tasks={user.priority3}
                    category={"priority3"}
                    deleteTask={deleteTask}
                />
            </div>
            <div className="dashboardCard notes">
                <h2>Notes</h2>
                <TaskItems
                    tasks={user.notes}
                    category={"notes"}
                    deleteTask={deleteTask}
                />
            </div>
        </div>
    );
};

export default Dashboard;
