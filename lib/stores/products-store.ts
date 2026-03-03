import { create } from "zustand";
import { products } from "@/lib/generated/prisma/client";
import {
    addProduct,
    deleteProduct,
    fetchProducts,
    updateProduct,
} from "@/services/productos-services";

interface ProductsState {
    products: products[];
    isLoading: boolean;
    error: string | null;
    listarProductos: () => Promise<void>;
    agregarProducto: (
        product: Omit<products, "id" | "createdAt" | "updatedAt">,
    ) => Promise<boolean>;
    editarProducto: (
        id: products["id"],
        product: Partial<Omit<products, "id" | "createdAt" | "updatedAt">>,
    ) => Promise<boolean>;
    eliminarProducto: (id: number) => Promise<boolean>;
    obtenerProductoPorId: (id: number) => products | undefined;
    obtenerProductosBajoStock: () => products[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,

    listarProductos: async () => {
        set({ isLoading: true, error: null });
        try {
            const productos = await fetchProducts();
            set({ products: productos, isLoading: false });
        } catch (error) {
            set({ error: "Error al obtener productos", isLoading: false });
        }
    },

    agregarProducto: async (
        productData: Omit<products, "id" | "createdAt" | "updatedAt">,
    ) => {
        set({ isLoading: true, error: null });
        try {
            await addProduct(productData);
            await get().listarProductos();
            return true;
        } catch (error) {
            set({ error: `Error al agregar el producto, ${error}` });
            return false;
        }
    },

    editarProducto: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            const productoActualizado = await updateProduct(id, updates);
            set((state) => ({
                products: state.products.map((p) =>
                    p.id === id ? productoActualizado : p,
                ),
                isLoading: false,
            }));
            return true;
        } catch (error) {
            set({
                error: `Error al actualizar el producto, ${error}`,
                isLoading: false,
            });
            return false;
        }
    },

    eliminarProducto: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const resultado = await deleteProduct(id);

            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
                isLoading: false,
            }));

            return true;
        } catch (error) {
            set({ error: "Error al eliminar producto", isLoading: false });
            return false;
        }
    },

    obtenerProductoPorId: (id: number) => {
        return get().products.find((product) => product.id === id);
    },

    obtenerProductosBajoStock: () => {
        return get().products.filter((product) => product.quantity <= 2);
    },
}));
