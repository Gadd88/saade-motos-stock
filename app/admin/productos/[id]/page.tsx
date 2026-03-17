import { AdminHeader } from "@/components/admin/admin-header";
import { ProductCard } from "@/components/producto/product-card";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface ViewOneProductProps {
    params: Promise<{
        id: string;
    }>;
}
export const dynamic = "force-dynamic";

export default async function ViewOneProduct({ params }: ViewOneProductProps) {
    const { id } = await params;

    const producto = await prisma.products.findUnique({
        where: { id: Number(id) },
    });

    if (!producto) redirect("/admin/stock");

    return (
        <div className="min-h-screen bg-background">
            <AdminHeader />
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center py-12">
                    <ProductCard product={producto} />
                </div>
            </main>
        </div>
    );
}
