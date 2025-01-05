import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton height={40} className="mb-4" />
        <Skeleton count={3} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};
