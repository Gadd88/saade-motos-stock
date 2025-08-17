import { ProtectedRoute } from "@/components/protected-route"
import { ProductForm } from "@/components/product-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}
export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: EditProductPageProps) {

  const { id } = await params

  return (
    <ProtectedRoute>
      <ProductForm productId={id} />
    </ProtectedRoute>
  )
}
