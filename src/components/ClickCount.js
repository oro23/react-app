import { useState } from "react";
export default function ClickCount() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Button clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}
