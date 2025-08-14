import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" }
});

export const getTodos   = () => api.get("/todos");
export const createTodo = (data) => api.post("/todos", data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);