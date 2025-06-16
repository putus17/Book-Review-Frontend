import { Routes, Route } from 'react-router-dom';
import Home from '../layout/Home';
import Login from '../layout/Login';
import SignIn from '../layout/SignUp/index';
import UserProfile from '../layout/Profile';
import Book from '../layout/Book';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignIn />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/reviews" element={<Book />} />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoute;
