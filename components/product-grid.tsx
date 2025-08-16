"use client"

import { useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { useProductsStore } from "@/lib/products-store"
import { Loader2 } from "lucide-react"

export function ProductGrid() {
  const { products, isLoading, error, fetchProducts } = useProductsStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="neo-card p-6 bg-destructive/10 border-destructive text-center">
        <p className="text-destructive">Error loading products: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="neo-heading text-2xl md:text-3xl" style={{ fontFamily: "var(--font-montserrat)" }}>
          PRODUCTOS DISPONIBLES
        </h2>
        <div className="text-sm text-muted-foreground">{products.length} productos</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
