import { products } from "@/lib/generated/prisma/client";

export const fetchProducts = async () => {
    try {
        const response = await fetch("/api/products", { next: { revalidate: 120 } });
        const products = await response.json();
        return products as products[];
    } catch (error) {
        console.error("Error al obtener productos");
    }
};

export const addProduct = async (
    productData: Omit<products, "id" | "createdAt" | "updatedAt">,
): Promise<products> => {
    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error("Ocurrió un error al agregar el producto");
        }
        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error al agregar el producto");
        throw error;
    }
};

export const updateProduct = async (
    id: products["id"],
    updates: Partial<Omit<products, "id" | "createdAt" | "updatedAt">>,
) => {
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error("Ocurrió un error actualizando el producto");
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Failed to update product");
        throw error;
    }
};

export const deleteProduct = async (id: products["id"]): Promise<boolean> => {
    const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    console.log(result)

    if (!response.ok) {
        throw new Error(`Ocurrió un error actualizando el producto, ${result.error}`);
    }

    return result;
};
