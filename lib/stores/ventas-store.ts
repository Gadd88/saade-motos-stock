import { create } from "zustand"
import { Prisma, ventas } from "../generated/prisma/client"
import { obtenerVentas } from "@/services/ventas-services"

export type VentaConItems = Prisma.ventasGetPayload<{
  include: {
    itemventa: {
      include: { products: true }
    }
  }
}>

interface VentaState {
    ventas: VentaConItems[]
    isLoading: boolean
    error: string | null
    listarVentas: () => Promise<void>
    generarVenta: () => Promise<boolean>
}

export const useVentaStore = create<VentaState>((set, get) => ({
    ventas: [],
    isLoading: false,
    error: null,
    listarVentas: async () => {
        set({isLoading: true, error: null})
        try {
            const listaVentas: VentaConItems[] = await obtenerVentas()
            // const ventasOrdenadas = listaVentas.sort((a, b) => b.id - a.id)
            set({ventas: listaVentas, isLoading:false, error: null})
        } catch (error) {
            console.log(error)
        }
    },
    generarVenta: async () => {
        return true
    }

}))