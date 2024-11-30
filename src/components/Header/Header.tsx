import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { logOut, resetState } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("jobsprint-auth-token");
    dispatch(logOut());
    dispatch(resetState());
    toast.success("Logout successful");
    navigate("/");
  };
  return (
    <header className="py-4 bg-gray-200">
      <div className="container">
        <nav className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">JobSprint</h2>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <Button onClick={handleLogout}>Logout</Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/auth/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
