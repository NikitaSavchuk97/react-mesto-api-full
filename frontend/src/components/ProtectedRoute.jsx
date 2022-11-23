import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggiedIn, children }) {
	if (!loggiedIn) {
		return <Navigate to="/sign-in" />;
	}

	return children;
}

export default ProtectedRoute;