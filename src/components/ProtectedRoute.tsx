import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = () => {
  const { token } = useAuthStore();

  // Redirect to login if no token exists
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
