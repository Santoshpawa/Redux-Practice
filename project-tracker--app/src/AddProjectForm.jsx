import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "./store";

function AddProjectForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addProject(title));
      setTitle("");
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="New project title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Project</button>
    </div>
  );
}

export default AddProjectForm;
