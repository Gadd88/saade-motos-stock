import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  role: "admin"
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Mock admin credentials
const MOCK_ADMIN = {
  email: "admin@saademotos.com",
  password: "Tito1996",
  user: {
    id: "1",
    email: "admin@saademotos.com",
    name: "Tito Saade",
    role: "admin" as const,
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const res = await fetch('/api/auth/login', {
          method: "POST",
          body: JSON.stringify({email, password}),
          headers: {"Content-Type": "application/json"}
        })
        if(res.ok){
          const data = await fetch('/api/auth/me')
          const { user } = await data.json()
          set({ user, isAuthenticated: true })
        }else{
          console.log("Login Fallido")
        }
        // Simulate API call delay
        // await new Promise((resolve) => setTimeout(resolve, 1000))

        // if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        //   set({ user: MOCK_ADMIN.user, isAuthenticated: true })
        //   return true
        // }
        // return false
      },
      logout: async () => {
        try{
          await fetch('/api/auth/logout', {
            method: "POST"
          })
          set({ user: null, isAuthenticated: false })
        }catch(error){
          console.error("Error en LOGOUT")
        }
      },
    }),
    {
      name: "saade-motos-auth",
    },
  ),
)
