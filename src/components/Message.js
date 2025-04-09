import React, { useState } from "react";

const Message = () => {
  const [message, changeMessage] = useState("Welcome Visitor");
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => changeMessage("Thank You!")}>Subscribe</button>
    </div>
  );
};

export default Message;
