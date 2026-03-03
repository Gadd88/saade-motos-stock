"use client";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { Eye, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ventas, itemventa, products } from "@/lib/generated/prisma/client";
import { useVentaStore } from "@/lib/stores/ventas-store";
import { useProductsStore } from "@/lib/stores/products-store";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { InputBusqueda } from "@/components/input-busqueda";
import { AdminHeader } from "@/components/admin/admin-header";
import { useCarritoState } from "@/lib/stores/carrito-store";
import { Carrito } from "@/components/carrito/carrito";

export default function NuevaVenta() {
    const [query, setQuery] = useState("");
    const [isPending, startTransition] = useTransition();
    const deferredQuery = useDeferredValue(query);
    const { agregarItemCarrito, carrito } = useCarritoState();
    const { products, isLoading, listarProductos } = useProductsStore();
    // const [selectedVenta, setSelectedVenta] = useState<VentaConItems | null>(
    //     null,
    // );

    useEffect(() => {
        listarProductos();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setQuery(e.target.value);
        });
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(deferredQuery.toLowerCase()),
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="text-muted-foreground">
                        Cargando Productos...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <AdminHeader />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1
                            className="neo-heading text-4xl mb-2"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                            NUEVA VENTA
                        </h1>
                    </div>
                </div>
                <InputBusqueda
                    filteredProducts={filteredProducts}
                    query={query}
                    products={products}
                    handleInputChange={handleInputChange}
                    isPending={isPending}
                />
                <div className="neo-card p-2 overflow-auto">
                    {/* Header de tabla */}
                    <Table
                        className="px-4 py-3 bg-primary text-primary uppercase"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white font-bold">
                                    Acciones
                                </TableHead>
                                <TableHead className="text-white font-bold">
                                    Producto
                                </TableHead>
                                <TableHead className="text-white font-bold">
                                    Precio Unitario
                                </TableHead>
                                <TableHead className="text-white font-bold">
                                    Stock
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow
                                    key={product.id}
                                    className="text-sm text-black font-semibold bg-secondary-foreground"
                                >
                                    <TableCell className="text-center">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="neo-button h-8 w-8 p-0 bg-sky-400"
                                            onClick={() =>
                                                agregarItemCarrito(product)
                                            }
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    {/* <TableCell>{product.quantity}</TableCell> */}
                                    <TableCell className="text-end">
                                        ${product.priceSale.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-end lowercase">
                                        {product.quantity}u.
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
            <Carrito />
        </>
    );

    {
        /* <VentaDetalleModal
                venta={selectedVenta}
                onClose={() => setSelectedVenta(null)}
            /> */
    }
}
