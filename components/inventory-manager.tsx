"use client"

import { useState, useEffect } from "react"
import { useProductsStore } from "@/lib/products-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminHeader } from "@/components/admin-header"
import { ProductDeleteDialog } from "@/components/product-delete-dialog"
import { Plus, Search, Edit, Trash2, Package, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function InventoryManager() {
  const { products, isLoading, error, fetchProducts, getLowStockProducts } = useProductsStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const lowStockProducts = getLowStockProducts()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading inventory...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="neo-heading text-4xl mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                ADMINISTRADOR DE PRODUCTOS
              </h1>
              <p className="text-muted-foreground">Administra tu stock de productos</p>
            </div>
            <Link href="/admin/products/add">
              <Button className="neo-button font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                <Plus className="w-4 h-4 mr-2" />
                AGREGAR NUEVO PRODUCTO
              </Button>
            </Link>
          </div>

          {error && (
            <div className="neo-card p-4 bg-destructive/10 border-destructive">
              <p className="text-destructive">Error: {error}</p>
            </div>
          )}

          {lowStockProducts.length > 0 && (
            <div className="neo-card p-4 bg-yellow-50 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-yellow-600" />
                <h2 className="neo-heading text-lg text-yellow-800" style={{ fontFamily: "var(--font-montserrat)" }}>
                  ALERTAS DE BAJO STOCK
                </h2>
              </div>
              <p className="text-yellow-700 text-sm mb-3">
                {lowStockProducts.length} producto(s) con bajo stock
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockProducts.map((product) => (
                  <Badge key={product._id} variant="secondary" className="bg-yellow-200 text-yellow-800 cursor-default">
                    {product.name} (quedan {product.stock})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="neo-card p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Busca productos por nombre o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 neo-button"
                />
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                {filteredProducts.length} de {products.length} productos
              </div>
            </div>

            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product._id} className="neo-card p-4 bg-background">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-24 h-24 relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover border-2 border-border"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <h3 className="neo-heading text-lg" style={{ fontFamily: "var(--font-montserrat)" }}>
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.stock <= 5 ? (
                            <Badge variant="secondary" className="bg-yellow-400 text-black border-black">
                              STOCK BAJO
                            </Badge>
                          ) : product.stock === 0 ? (
                            <Badge variant="destructive">SIN STOCK</Badge>
                          ) : (
                            <Badge variant="outline">EN STOCK</Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div>
                            <span className="text-xs text-muted-foreground">Price</span>
                            <div
                              className="neo-heading text-xl text-primary"
                              style={{ fontFamily: "var(--font-montserrat)" }}
                            >
                              ${product.price}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Stock</span>
                            <div className="neo-heading text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                              {product.stock}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <Link href={`/admin/products/${product._id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="neo-button font-semibold bg-transparent"
                              style={{ fontFamily: "var(--font-montserrat)" }}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              EDITAR
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteProductId(product._id)}
                            className="neo-button font-semibold"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            ELIMINAR
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="neo-heading text-lg mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                    NO SE ENCONTRARON PRODUCTOS
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Ningún producto coincide con la búsqueda" : "No hay producto en stock."}
                  </p>
                  <Link href="/admin/products/add">
                    <Button className="neo-button font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                      <Plus className="w-4 h-4 mr-2" />
                      AGREGAR PRODUCTO
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ProductDeleteDialog productId={deleteProductId} onClose={() => setDeleteProductId(null)} />
    </div>
  )
}
