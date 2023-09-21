import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";




const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    axios.post("http://127.0.0.1:8000/auth/users/", data)
      .then((res) => {
        window.location.href = "/";
        console.log(res);
      })
  }

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
            value={"H77h6n{u1efN"}
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