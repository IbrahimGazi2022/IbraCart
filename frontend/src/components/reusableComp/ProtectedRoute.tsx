import { useSelector } from "react-redux"
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface childrenProps {
    children: React.ReactNode,
    requiredRole?: string
}

const ProtectedRoute = ({ children, requiredRole }: childrenProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute
