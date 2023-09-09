import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
  let num = 0;
  const [num2, setNum2] = useState(0);
  const increment = () => {
    num++;
  };
  const increment2 = () => {
    setNum2(num2 + 1);
  };
  const show = () => {
    alert(`num: ${num}\n num2: ${num2}`);
  };

  useEffect(() => {
    console.log("num2 changed");
  }, [num2]);
  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <p>{num}</p>
      <p>{num2}</p>
      <button onClick={increment}>Increment 1</button>
      <button onClick={increment2}>Increment 2</button>
      <button onClick={show}>Show</button>
    </>
  );
};

export default Home;
