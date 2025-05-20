import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./types";

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo(state, action: PayloadAction<number>) {
      const newState = state.filter((t) => t.id !== action.payload);
      return newState;
    },
    clearCompleted(state) {
      const newState = state.filter((t) => !t.completed);
      return newState;
    },
    setInitialTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  setInitialTodos,
  updateTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
