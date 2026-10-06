import React from "react";

export default function UseCallback() {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log("Button clicked");
  }, []);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  //   console.log("ChildComponent rendered");
  return (
    <div>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}
