"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/auth-store"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
      console.log(isAuthenticated)
      if (isAuthenticated) {
        router.push("/admin")
      } else {
        setError("Email o Password inválidos")
      }
    } catch (err) {
      setError("Login falló. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="neo-heading text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>
            EMAIL
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="neo-button h-12 text-base"
            placeholder="tuemail@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="neo-heading text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>
            PASSWORD
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="neo-button h-12 text-base"
            placeholder="Ingresa tu password"
          />
        </div>
      </div>

      {error && (
        <div className="neo-card p-3 bg-destructive/10 border-destructive text-destructive text-sm">{error}</div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full neo-button h-12 text-base font-bold"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            INGRESANDO..
          </>
        ) : (
          "INGRESO ADMIN"
        )}
      </Button>
    </form>
  )
}
