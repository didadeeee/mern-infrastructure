import { Link } from "react-router-dom";
import { logout } from "../../utilities/users-service";

function NavBar( {user, setUser}) {
  const welcomeMessage = user === null ? "" : `Welcome ${user.name}`;

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <>
    <nav>
      <Link to="/orders">Order History</Link>
      <Link to="/orders/new">New Order</Link>
      <Link to="/login">Login</Link>
    </nav>
    <p>{welcomeMessage}</p>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default NavBar;
