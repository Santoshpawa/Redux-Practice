import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  createProject,
  removeProject,
} from "../features/projects/projectSlice";
import { useEffect, useState } from "react";
import { logoutUser } from "../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { list: projects } = useSelector((state) => state.projects);

  const [newProjectTitle, setNewProjectTitle] = useState("");

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchProjects(user.uid));
    }
  }, [user, dispatch]);

  const handleAddProject = () => {
    if (!newProjectTitle.trim()) return;
    dispatch(
      createProject({
        userId: user.uid,
        projectData: {
          title: newProjectTitle,
          createdAt: Date.now(),
        },
      })
    );
    setNewProjectTitle("");
  };

  const handleDeleteProject = (projectId) => {
    dispatch(removeProject({ userId: user.uid, projectId }));
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      <h2>Projects Dashboard</h2>
      <p>Logged in as: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <input
        placeholder="New Project Title"
        value={newProjectTitle}
        onChange={(e) => setNewProjectTitle(e.target.value)}
      />
      <button onClick={handleAddProject}>Add Project</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.title}
            <button onClick={() => handleDeleteProject(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
