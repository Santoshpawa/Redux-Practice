import { configureStore, createSlice } from "@reduxjs/toolkit";

let nextId = 1;

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: nextId++,
        text: action.payload,
        completed: false,
      });
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, removeTask, toggleTask } = taskSlice.actions;

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export default store;
