import { ProtectedRoute } from "@/components/protected-route"
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/products-store";

interface ViewOneProductProps {
  params: {
    id: string
  }
}
export const dynamic = "force-dynamic";

export default async function ViewOneProduct({ params }: ViewOneProductProps) {

    const { id } = await params
    const response = await fetch(`api/products/${id}`)
    const product: Product = await response.json()

 
  return (
    <ProtectedRoute>
        <ProductCard product={product} />
    </ProtectedRoute>
  )
}
