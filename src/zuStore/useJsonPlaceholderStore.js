// src/store/useJsonPlaceholderStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com";

const useJsonPlaceholderStore = create((set) => ({
  // State
  posts: [],
  users: [],
  todos: [],
  currentUserId: null,
  loading: false,
  error: null,

  // Actions
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE}/posts`);
      set({ posts: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE}/users`);
      set({ users: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchTodos: async (userId) => {
    set({ loading: true, error: null });
    try {
      const url = userId
        ? `${API_BASE}/todos?userId=${userId}`
        : `${API_BASE}/todos`;
      const response = await axios.get(url);
      set({ todos: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setCurrentUserId: (userId) => set({ currentUserId: userId }),

  // Bonus: Get posts by user
  getPostsByUser: (userId) => {
    const { posts } = useJsonPlaceholderStore.getState();
    return posts.filter((post) => post.userId === userId);
  },

  // Bonus: Get user by ID
  getUserById: (userId) => {
    const { users } = useJsonPlaceholderStore.getState();
    return users.find((user) => user.id === userId);
  },
}));

export default useJsonPlaceholderStore;
