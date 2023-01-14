import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div onClick={() => console.log(123)}>Home
      <Link to='/list'>listt</Link>
    </div>
  );
}

export default Home;