import { ProtectedRoute } from "@/components/protected-route"
import { ProductForm } from "@/components/product-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <ProtectedRoute>
      <ProductForm productId={params.id} />
    </ProtectedRoute>
  )
}
