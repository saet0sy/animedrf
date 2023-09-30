import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../scss/styles.scss"
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8000/auth/jwt/create/`, data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axios
          .get(`http://localhost:8000/auth/users/me/`, {
            headers: {
              Authorization: `Bearer ${res.data.access}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/";
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            // value={"H77h6n{u1efN"}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          <Link className="login-button" type="submit" to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
