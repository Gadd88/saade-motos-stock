import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/generated/prisma/client";

interface ProductCardProps {
    product: products;
}

export function ProductCard({ product }: ProductCardProps) {
    const isLowStock = product.quantity <= 2;
    const isOutOfStock = product.quantity === 0;

    return (
        // <div className="neo-card p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_theme(colors.border)] transition-all duration-200">
        //   <div className="relative">
        //     <Image
        //       src={"/placeholder.svg"}
        //       alt={product.name}
        //       width={200}
        //       height={200}
        //       className="w-full h-48 object-cover border-2 border-border"
        //     />
        //     <div className="absolute top-2 right-2">
        //       {isOutOfStock ? (
        //         <Badge variant="destructive" className="neo-button text-xs font-bold">
        //           SIN STOCK
        //         </Badge>
        //       ) : isLowStock ? (
        //         <Badge variant="secondary" className="neo-button text-xs font-bold bg-yellow-400 text-black border-black">
        //           BAJO STOCK
        //         </Badge>
        //       ) : (
        //         <Badge variant="outline" className="neo-button text-xs font-bold">
        //           CON STOCK
        //         </Badge>
        //       )}
        //     </div>
        //   </div>

        //   <div className="space-y-2">
        //     <h3 className="neo-heading text-lg leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
        //       {product.name}
        //     </h3>
        //   </div>

        //   <div className="flex items-center justify-between">
        //     <div className="space-y-1">
        //       <div className="neo-heading text-2xl text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
        //         ${product.priceSale}
        //       </div>
        //     </div>
        //     {
        //       user &&
        //       <Button
        //         variant={isOutOfStock ? "secondary" : "default"}
        //         disabled={isOutOfStock}
        //         className="neo-button font-bold"
        //         style={{ fontFamily: "var(--font-montserrat)" }}
        //       >
        //         {isOutOfStock ? "SIN STOCK" : "DETALLES"}
        //       </Button>
        //     }
        //   </div>
        // </div>

        <div className="neo-card flex flex-col sm:flex-row items-stretch hover:shadow-[6px_6px_0px_0px_theme(--colors-border)] transition-all duration-200 overflow-hidden">
            {/* Contenido */}
            <div className="flex flex-1 flex-col justify-between p-3 gap-3 min-w-0">
                {/* Nombre + precio */}
                <div className="flex flex-col gap-1 min-w-0">
                    <h3
                        className="neo-heading text-sm leading-tight line-clamp-2"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                        {product.name}
                    </h3>
                    <div
                        className="neo-heading text-lg text-primary"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                        ${product.priceSale}
                    </div>
                </div>

                {/* Badge + botón siempre en la misma fila, sin overflow */}
                <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
                    {isOutOfStock ? (
                        <Badge
                            variant="destructive"
                            className="neo-button text-xs font-bold whitespace-nowrap"
                        >
                            SIN STOCK
                        </Badge>
                    ) : isLowStock ? (
                        <Badge className="neo-button text-xs font-bold bg-yellow-400 text-black border-black whitespace-nowrap">
                            BAJO STOCK
                        </Badge>
                    ) : null}

                    <Button
                        variant={isOutOfStock ? "secondary" : "default"}
                        disabled={isOutOfStock}
                        size="sm"
                        className="neo-button font-bold text-xs whitespace-nowrap ms-auto"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                        {isOutOfStock ? "SIN STOCK" : "DETALLES"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
