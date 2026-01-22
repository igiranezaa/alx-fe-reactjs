import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", margin: "10px" }}>
      <p>Current Count: {count}</p>

      <button onClick={() => setCount(count + 1)} style={{ marginRight: "8px" }}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)} style={{ marginRight: "8px" }}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
