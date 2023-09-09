import Navbar from "@/components/Navbar";
import { ReactComponent as Bricks } from "bootstrap-icons/icons/bricks.svg";
import { ReactComponent as BagFill } from "bootstrap-icons/icons/bag-fill.svg";
import React from "react";
const About = () => {
  return (
    <>
      <Navbar />
      <h1>About</h1>
      <Bricks />
      <BagFill />
    </>
  );
};

export default About;
