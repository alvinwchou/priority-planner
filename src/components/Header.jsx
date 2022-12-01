import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/firebase/FirebaseConfig";

const Header = ({ logoutUser }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        logoutUser();
        signOut(auth).then(() => navigate("/login"));
    };

    return (
        <div className="header">
            <p onClick={handleClick}>+</p>
            <h1>Daily Planner</h1>
            <p>Date: Today's date</p>
        </div>
    );
};

export default Header;
