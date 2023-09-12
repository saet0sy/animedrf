import { Link } from "react-router-dom";

const Navbar = () => {
  const routes = [
    {
      path: "/",
      title: "Serials", // Замените "Home" на "Serials"
    },
    {
      path: "/about",
      title: "Blogs", // Замените "About" на "Blogs"
    },
    {
      path: "/anime",
      title: "Top 100", // Замените "Anime List" на "Top 100"
    },
  ];

  const navStyle = {
    display: "flex",
    marginTop: '-70px',
    justifyContent: "center", // Центрирование элементов по горизонтали
    alignItems: "center", // Выравнивание элементов по вертикали
    backgroundColor: "#262626",
  };
  

  const ulStyle = {
    listStyle: "none",
    display: "flex",
  };

  const liStyle = {
    margin: "0 300px 0 0",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white", // Сделайте цвет текста белым
    borderBottom: "none", // Уберите подводку
    fontSize: "18px",
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {routes.map((route, idx) => {
          return (
            <li key={idx} style={liStyle}>
              <Link to={route.path} style={linkStyle}>{route.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
