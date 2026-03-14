import { products } from "@/lib/generated/prisma/client";
import { ItemCarrito } from "@/lib/stores/carrito-store";

export const obtenerVentas = async () => {
    const response = await fetch("/api/ventas", {
        cache: "no-store",
    });
    const result = await response.json();
    return result;
};

export const crearVenta = async (productos: ItemCarrito[]) => {
    const items = productos.map((item) => transformarProducto(item));

    const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(items),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || `Ocurrió un error al realizar venta`);
    return result;
};

const transformarProducto = (producto: products) => {
    return {
        id: producto.id,
        name: producto.name,
        priceSale: producto.priceSale,
        quantity: producto.quantity,
    };
};
