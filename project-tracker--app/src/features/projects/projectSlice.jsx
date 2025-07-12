import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjects,
  addProject,
  deleteProject,
  updateProject
} from "../../firebase/firestoreService";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userId) => await getProjects(userId)
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async ({ userId, projectData }) => await addProject(userId, projectData)
);

export const removeProject = createAsyncThunk(
  "projects/removeProject",
  async ({ userId, projectId }) => {
    await deleteProject(userId, projectId);
    return projectId;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
