import {create} from "zustand";
import { fetchUsers, fetchProfile, addUser, updateUser, deleteUser } from "../controllers/userController";

export const useUserStore = create((set) => ({
  users: [],
  profile: [],
  fetchProfile: async () => {
    const profile = await fetchProfile();
    set({ profile });
  },
  fetchUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },
  addUser: async (user) => {
    const newUser = await addUser(user);
    if (newUser) {
      set((state) => ({ users: [...state.users, newUser] }));
    }
  },
  updateUser: async (id, updatedUser) => {
    const updated = await updateUser(id, updatedUser);
    if (updated) {
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? { ...user, ...updatedUser } : user
        ),
      }));
    }
  },
  deleteUser: async (id) => {
    const deleted = await deleteUser(id);
    if (deleted) {
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
    }
  },
}));
