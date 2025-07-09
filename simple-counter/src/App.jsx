import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./store";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🔢 Counter App</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())} style={{ marginRight: 10 }}>
        ➕ Increment
      </button>
      <button onClick={() => dispatch(decrement())}>➖ Decrement</button>
    </div>
  );
}

export default App;
