"use client"

import { useAuthStore } from "@/lib/auth-store"
import { Button } from "@/components/ui/button"
import { LogOut, Package, Plus, Home } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="border-b-4 border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary-foreground neo-button"></div>
              <span className="neo-heading text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                SAADE MOTOS
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="neo-button font-semibold bg-transparent"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  DASHBOARD
                </Button>
              </Link>
              <Link href="/admin/inventory">
                <Button
                  variant="ghost"
                  className="neo-button font-semibold bg-transparent"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  INVENTARIO
                </Button>
              </Link>
              <Link href="/admin/products/add">
                <Button
                  variant="ghost"
                  className="neo-button font-semibold bg-transparent"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  AGREGAR PRODUCTO
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">Bienvenido, {user?.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="neo-button font-semibold bg-transparent"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
