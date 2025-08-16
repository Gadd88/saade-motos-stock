import { ProtectedRoute } from "@/components/protected-route"
import { ProductForm } from "@/components/product-form"

export default function AddProductPage() {
  return (
    <ProtectedRoute>
      <ProductForm />
    </ProtectedRoute>
  )
}
