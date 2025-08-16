"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { useProductsStore } from "@/lib/products-store"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin-header"
import { Package, Plus, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const { user } = useAuthStore()
  const { products, isLoading, fetchProducts, getLowStockProducts } = useProductsStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const lowStockProducts = getLowStockProducts()
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const totalItems = products.reduce((sum, product) => sum + product.stock, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="text-muted-foreground">Cargando dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="neo-heading text-4xl md:text-6xl mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
              ADMIN DASHBOARD
            </h1>
            <p className="text-lg text-muted-foreground">
              Bienvenido, {user?.name}! Controla tu inventario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="neo-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <div className="neo-heading text-3xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {products.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total de Productos</div>
                </div>
              </div>
            </div>

            <div className="neo-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <div
                    className="neo-heading text-3xl text-yellow-600"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {lowStockProducts.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Productos con Bajo Stock</div>
                </div>
              </div>
            </div>

            <div className="neo-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <div className="neo-heading text-3xl text-green-600" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {totalItems}
                  </div>
                  <div className="text-sm text-muted-foreground">Productos en Total</div>
                </div>
              </div>
            </div>

            <div className="neo-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <div className="neo-heading text-2xl text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
                    ${totalValue.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Valor del Inventario</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/admin/inventory"
              className="neo-card p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_theme(colors.border)] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <h2 className="neo-heading text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Administrar Inventario
                </h2>
              </div>
              <p className="text-muted-foreground">Revisa, edita y borra productos de tu inventario</p>
              <Button className="w-full neo-button font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                Abrir Inventario
              </Button>
            </Link>

            <Link
              href="/admin/products/add"
              className="neo-card p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_theme(colors.border)] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-8 h-8 text-primary" />
                <h2 className="neo-heading text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Agregar Producto
                </h2>
              </div>
              <p className="text-muted-foreground">Agrega nuevos productos a tu inventario</p>
              <Button className="w-full neo-button font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                Agregar Producto
              </Button>
            </Link>

            <div className="neo-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <h2 className="neo-heading text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Alertas de Bajo Stock
                </h2>
              </div>
              <p className="text-muted-foreground">
                {lowStockProducts.length > 0
                  ? `${lowStockProducts.length} productos necesitan re-stock`
                  : "Todos los productos en stock"}
              </p>
              <Link href="/admin/inventory">
                <Button
                  variant="outline"
                  className="w-full neo-button font-bold bg-transparent"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Ver Alertas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
