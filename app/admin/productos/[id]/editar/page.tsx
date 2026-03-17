import { ProductForm } from "@/components/producto/product-form";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface EditProductPageProps {
    params: Promise<{id: string}>;
}
export const dynamic = "force-dynamic";

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { id } = await params;

    const producto = await prisma.products.findUnique({where: {id: Number(id)}})


    if(!id || !producto) redirect('/admin/stock')

    return <ProductForm productId={Number(id)} productoData={producto} />;
}
