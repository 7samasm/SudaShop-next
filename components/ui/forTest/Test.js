import React, { useEffect, useState } from "react";
import callback from "./callback";

const Test = () => {
  const [text, setText] = useState();
  const [btnClicked, setbtnClicked] = useState(false);
  useEffect(() => {
    callback(10);
    setText(`btn was cliked : ${btnClicked.toString()} `);
  }, [btnClicked]);
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => setbtnClicked(true)}>click me</button>
    </div>
  );
};

export default Test;
