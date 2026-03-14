import { ProductForm } from "@/components/producto/product-form";

interface EditProductPageProps {
    params: {
        id: string;
    };
}
export const dynamic = "force-dynamic";

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { id } = await params;

    return <ProductForm productId={Number(id)} />;
}
