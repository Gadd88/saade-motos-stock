import { create } from "zustand"

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  createdAt: string
  updatedAt: string
}

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addProduct: (product: Omit<Product, "_id" | "createdAt" | "updatedAt">) => Promise<boolean>
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>
  deleteProduct: (id: string) => Promise<boolean>
  getProduct: (id: string) => Product | undefined
  getLowStockProducts: () => Product[]
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch("/api/products")
      const result = await response.json()
      if (result.success) {
        set({ products: result.data, isLoading: false })
      } else {
        set({ error: result.error, isLoading: false })
      }
    } catch (error) {
      set({ error: "Failed to fetch products", isLoading: false })
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      const result = await response.json()

      if (result.success) {
        // Refresh products list
        await get().fetchProducts()
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: "Failed to add product" })
      return false
    }
  },

  updateProduct: async (id, updates) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      const result = await response.json()

      if (result.success) {
        // Refresh products list
        await get().fetchProducts()
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: "Failed to update product" })
      return false
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        // Refresh products list
        await get().fetchProducts()
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: "Failed to delete product" })
      return false
    }
  },

  getProduct: (id) => {
    return get().products.find((product) => product._id === id)
  },

  getLowStockProducts: () => {
    return get().products.filter((product) => product.stock <= 5)
  },
}))
