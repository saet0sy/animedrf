import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../scss/styles.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://127.0.0.1:8000/auth/users/", data)
      .then((res) => {
        console.log("Registration successful", res);
        axios
          .post("http://127.0.0.1:8000/auth/jwt/create/", {
            username: data.username,
            password: data.password,
          })
          .then((tokenRes) => {
            localStorage.setItem("access_token", tokenRes.data.access);
            localStorage.setItem("refresh_token", tokenRes.data.refresh);
            console.log("JWT-tokens obtained", tokenRes);
            
            window.location.href = "/login"; 
          })
          .catch((tokenError) => {
            console.error("JWT-token obtain error:", tokenError);
          });
      })
      .catch((error) => {
        console.error("Registration error", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1>Register</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <input
            className="login-input"
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <button className="login-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}



export default Register;