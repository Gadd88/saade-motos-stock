"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useProductsStore } from "@/lib/products-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { AdminHeader } from "@/components/admin-header"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface ProductFormProps {
  productId?: string
}

const categories = [
  "varios",
]

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter()
  const { addProduct, updateProduct, getProduct, fetchProducts } = useProductsStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  })

  const isEditing = !!productId
  const existingProduct = productId ? getProduct(productId) : null

  useEffect(() => {
    if (productId && !existingProduct) {
      fetchProducts()
    }
  }, [productId, existingProduct, fetchProducts])

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price.toString(),
        stock: existingProduct.stock.toString(),
        category: existingProduct.category,
        image: existingProduct.image,
      })
    }
  }, [existingProduct])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category: formData.category,
        image: formData.image || "/placeholder.svg",
      }

      let success = false
      if (isEditing && productId) {
        success = await updateProduct(productId, productData)
      } else {
        success = await addProduct(productData)
      }

      if (success) {
        router.push("/admin/inventory")
      } else {
        setError("Error al guardar. Intente nuevamente")
      }
    } catch (error) {
      console.error("Error guardando el producto:", error)
      setError("Ocurrió un error inesperado.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <AdminHeader /> */}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Link href="/admin/inventory">
              <Button
                variant="outline"
                className="neo-button font-semibold bg-transparent"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                VOLVER AL INTENVARIO
              </Button>
            </Link>
            <div>
              <h1 className="neo-heading text-4xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                {isEditing ? "EDITAR PRODUCTO" : "AGREGAR NUEVO PRODUCTO"}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? "Actualizar datos del producto" : "Agrega una nueva pieza al inventario"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="neo-card p-6 space-y-6">
            {error && (
              <div className="neo-card p-3 bg-destructive/10 border-destructive text-destructive text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="neo-heading text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>
                  PRODUCTO *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="neo-button"
                  placeholder="Filtro de Aire Honda CBR 150"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="neo-heading text-sm"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  CATEGORIA *
                </Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full neo-button h-10 px-3 py-2 bg-input border-4 border-border text-sm"
                >
                  <option value="">Selecciona una Categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="neo-heading text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>
                  PRECIO ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="neo-button"
                  placeholder="$10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="neo-heading text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>
                  CANTIDAD EN STOCK *
                </Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  className="neo-button"
                  placeholder="5"
                />
              </div>
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="IMAGEN DEL PRODUCTO"
            />

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="neo-heading text-sm"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                DESCRIPCIÓN *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="neo-button min-h-[100px]"
                placeholder="Filtro de aire origen japonés, marca Tanaka..."
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 neo-button font-bold"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "GUARDANDO..." : isEditing ? "ACTUALIZAR PRODUCTO" : "AGREGAR PRODUCTO"}
              </Button>
              <Link href="/admin/inventory" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full neo-button font-bold bg-transparent"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  CANCELAR
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
