import { Link } from "react-router-dom";
import "../scss/styles.scss";

const Navbar = () => {
  const routes = [
    {
      path: "/",
      title: "Comments", 
    },
    {
      path: "/about",
      title: "About", 
    },
    {
      path: "/anime",
      title: "Anime", 
    },
  ];


    return (
      <nav className="navbar">
        <ul className="nav-ul">
          {routes.map((route, idx) => (
            <li key={idx} className="nav-li">
              <Link to={route.path} className="nav-link">
                {route.title}
              </Link>
            </li>
          ))}
          <li className="nav-li">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
