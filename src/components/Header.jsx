import { signOut } from "firebase/auth";
import { auth } from "../features/firebase/FirebaseConfig";

const Header = ({ logoutUser }) => {
    const handleClick = () => {
        logoutUser();
        signOut(auth);
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
