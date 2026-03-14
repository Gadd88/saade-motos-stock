import { ProductCard } from "@/components/producto/product-card";
import { products } from "@/lib/generated/prisma/client";

interface ViewOneProductProps {
    params: {
        id: string;
    };
}
export const dynamic = "force-dynamic";

export default async function ViewOneProduct({ params }: ViewOneProductProps) {
    const { id } = await params;
    const response = await fetch(`api/products/${id}`);
    const product: products = await response.json();

    return <ProductCard product={product} />;
}
