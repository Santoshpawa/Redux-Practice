import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// PROJECTS -----------------------------
export const addProject = async (userId, projectData) => {
  const projectsRef = collection(db, "users", userId, "projects");
  const docRef = await addDoc(projectsRef, projectData);
  return { id: docRef.id, ...projectData };
};

export const getProjects = async (userId) => {
  const projectsRef = collection(db, "users", userId, "projects");
  const snapshot = await getDocs(projectsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateProject = async (userId, projectId, updatedData) => {
  const docRef = doc(db, "users", userId, "projects", projectId);
  await updateDoc(docRef, updatedData);
};

export const deleteProject = async (userId, projectId) => {
  const docRef = doc(db, "users", userId, "projects", projectId);
  await deleteDoc(docRef);
};

// TASKS -----------------------------
export const addTask = async (userId, projectId, taskData) => {
  const tasksRef = collection(
    db,
    "users",
    userId,
    "projects",
    projectId,
    "tasks"
  );
  const docRef = await addDoc(tasksRef, taskData);
  return { id: docRef.id, ...taskData };
};

export const getTasks = async (userId, projectId) => {
  const tasksRef = collection(
    db,
    "users",
    userId,
    "projects",
    projectId,
    "tasks"
  );
  const snapshot = await getDocs(tasksRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createUserDocument = async (user) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    email: user.email,
    createdAt: Date.now(),
  });
};
