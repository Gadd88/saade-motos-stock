import { Search } from "lucide-react";
import { Input } from "./ui/input";
import React from "react";
import { products } from "@/lib/generated/prisma/client";

type InputBusquedaProps = {
    query: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isPending: boolean;
    filteredProducts: products[];
    products: products[];
    showLength?: boolean;
};

export const InputBusqueda = ({
    query,
    handleInputChange,
    isPending,
    filteredProducts,
    products,
    showLength,
}: InputBusquedaProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 neo-card">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    placeholder="Busca productos por nombre o categoría..."
                    value={query}
                    onChange={handleInputChange}
                    // onChange={(e) =>
                    //     setSearchTerm(e.target.value)
                    // }
                    className={`pl-10 neo-button ${isPending ? "opacity-50" : "opacity-100"}`}
                />
            </div>
            {showLength && (
                <div className="text-sm text-muted-foreground flex items-center my-2 justify-end p-1">
                    {filteredProducts.length} de {products.length} productos
                </div>
            )}
        </div>
    );
};
