import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import QueryState from "./QueryState";

export default function ProtectedRoute({ children }) {
    const { isPending, error, isAuthenticated } = useUser();

    if (isPending || error) {
        return (
            <QueryState
                isLoading={isPending}
                error={error}
                loadingMessage="Loading user..."
                errorMessage="Could not load user"
                variant="centered"
            />
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
