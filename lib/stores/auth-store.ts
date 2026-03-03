import { create } from "zustand";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import Cookie from 'js-cookie'

interface AuthState {
    user: User | null;
    loading: true | false;
    error: string | null;
    setUser: (user: User | null) => void;
    setLoading: (arg: boolean) => void;
    loginEmail: (email: string, pass: string) => Promise<void>;
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    error: null,
    setUser: (user) => set({ user, loading: false }),

    setLoading: (arg) => set({ loading: arg }),

    loginEmail: async (email, pass) => {
        set({ loading: true, error: null });
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, pass);
            const token = await userCredentials.user.getIdToken()
            Cookie.set('session', token, {expires: 7})
            set({ loading: false })
        } catch (err: any) {
            set({ error: err.message, loading: false });
            throw err;
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            Cookie.remove('session')
            set({ user: null, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
            console.error("Error al salir", err);
        }
    },
}));
