import { create } from "zustand";
import { persist } from "zustand/middleware";
import { registerUser, loginUser } from "../controllers/authController";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: async (email, password) => {
        const res = await loginUser(email, password);
        if (res) set({ user: res });
        return !!res;
      },
      register: async (name, email, password) => {
        const res = await registerUser(name, email, password);
        return !!res;
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);



// import { create } from "zustand";
// import { registerUser, loginUser } from "../controllers/authController";
 
// export const useAuthStore = create((set) => ({
//   user: null,
//   login: async (email,password) => {
//     const login = await loginUser(email,password);
//     if (login) set({user : login});
//       return !!login;
//   },
//   register: async (name,email,password) => {
//     const register = await registerUser(name,email,password);
//     return !!register;
//   },
//   logout: () =>{
//     set({user: null});
//   },
// }))
 
