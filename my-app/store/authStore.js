import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            token: null,
            setUser: (user) => set({ user }),
            setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
            logout: () => set({ user: null, isLoggedIn: false, token: null }),
            setToken: (token) => set({ token }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuthStore;