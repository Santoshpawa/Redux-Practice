import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, toggleTask } from "./store";

function App() {
  const [text, setText] = useState("");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTask(text));
      setText("");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>📝 Task List</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd} style={{ marginLeft: 10 }}>
        Add Task
      </button>

      <ul style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 10 }}>
            <span
              onClick={() => dispatch(toggleTask(task.id))}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: 10,
              }}
            >
              {task.text}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
