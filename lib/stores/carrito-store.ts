import { create } from "zustand";
import { products } from "../generated/prisma/client";
import { toast } from "sonner";

interface CarritoState {
    carrito: ItemCarrito[];
    agregarItemCarrito: (arg: products) => void;
    editarCantidad: (
        id: products["id"],
        cantidad: products["quantity"],
    ) => void;
    eliminarItem: (id: products["id"]) => void;
    vaciarCarrito: () => void;
    isOpen: boolean;
    setIsOpen: (v: boolean) => void
}

export interface ItemCarrito extends products {
    stockMaximo: number;
}

export const useCarritoState = create<CarritoState>((set, get) => ({
    carrito: [],
    isOpen: false,
    setIsOpen: (v) => set({isOpen: v}),
    agregarItemCarrito: (products) => {
        const itemsCarrito = get().carrito;
        const itemExists = itemsCarrito.find((item) => item.id === products.id);
        if (itemExists) {
            if (itemExists.quantity <= itemExists.stockMaximo)
                set({
                    carrito: itemsCarrito.map((item) =>
                        item.id === products.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                });
        } else {
            set({
                carrito: [
                    ...itemsCarrito,
                    {
                        ...products,
                        quantity: 1,
                        stockMaximo: products.quantity,
                    },
                ],
            });
        }
        toast.success("Item agregado al carrito")
    },
    editarCantidad: (id, cantidad) => {
        const carritoActual = get().carrito;
        const producto = carritoActual.find((item) => item.id === id);
        if (producto) {
            const nuevoCarrito = get().carrito.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity:
                              cantidad > 0 && cantidad <= producto.stockMaximo
                                  ? cantidad
                                  : item.quantity,
                      }
                    : item,
            );
            set({ carrito: nuevoCarrito });
        }
        toast.success("Cantidad editada")
    },
    eliminarItem: (id) => {
        const nuevoCarrito = get().carrito.filter((item) => item.id !== id);
        set({ carrito: nuevoCarrito });
        toast.warning("Item eliminado")
    },
    vaciarCarrito: () => {
        set({carrito: []})
    }
}));
