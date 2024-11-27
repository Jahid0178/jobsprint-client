import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="py-4 bg-gray-200">
      <div className="container">
        <nav className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">JobSprint</h2>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/job-listings">Job Listings</NavLink>
            </li>
            <li>
              <NavLink to="/auth/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/auth/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
