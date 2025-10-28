import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
    const { user } = useContext(UserContext);
    if (!user) {
        return <Navigate to="/dashboard" replace={true} />;
    }
    return children;
}
