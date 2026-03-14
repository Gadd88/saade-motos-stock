import Link from "next/link";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { products } from "@/lib/generated/prisma/client";

type ProductCardStockType = {
    product: products
    onDelete: (id: products['id']) => void
}

export const ProductCardStock = ({product, onDelete}: ProductCardStockType) => {
    return (
        <div key={product.id} className="neo-card p-4 bg-background">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                            <h3
                                className="neo-heading text-lg"
                                style={{
                                    fontFamily: "var(--font-montserrat)",
                                }}
                            >
                                {product.name}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            {product.quantity <= 2 ? (
                                <Badge
                                    variant="secondary"
                                    className="bg-yellow-400 text-black border-black"
                                >
                                    STOCK BAJO
                                </Badge>
                            ) : product.quantity === 0 ? (
                                <Badge variant="destructive">SIN STOCK</Badge>
                            ) : (
                                <Badge variant="outline">EN STOCK</Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div>
                                <span className="text-xs text-muted-foreground">
                                    Price
                                </span>
                                <div
                                    className="neo-heading text-xl text-primary"
                                    style={{
                                        fontFamily: "var(--font-montserrat)",
                                    }}
                                >
                                    ${product.priceSale}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">
                                    Stock
                                </span>
                                <div
                                    className="neo-heading text-xl"
                                    style={{
                                        fontFamily: "var(--font-montserrat)",
                                    }}
                                >
                                    {product.quantity}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <Link
                                href={`/admin/productos/${product.id}/editar`}
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="neo-button font-semibold bg-transparent"
                                    style={{
                                        fontFamily: "var(--font-montserrat)",
                                    }}
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    EDITAR
                                </Button>
                            </Link>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(product.id)}
                                className="neo-button font-semibold"
                                style={{
                                    fontFamily: "var(--font-montserrat)",
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                ELIMINAR
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
