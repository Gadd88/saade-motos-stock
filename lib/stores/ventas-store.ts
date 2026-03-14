import { create } from "zustand"
import { Prisma } from "../generated/prisma/client"
import { crearVenta, obtenerVentas } from "@/services/ventas-services"
import { ItemCarrito, useCarritoState } from "./carrito-store"
import { toast } from "sonner"

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
    generarVenta: (productos: ItemCarrito[]) => Promise<void>
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
    generarVenta: async (productos) => {
        set({isLoading: true})
        const toastId = toast.loading("Procesando venta...")
        try{
            const nuevaVenta = await crearVenta(productos)
            toast.success(`Venta creada correctamente. Venta: ${nuevaVenta.idVentas}`, {id: toastId})

            const { vaciarCarrito, setIsOpen } = useCarritoState.getState()
            setIsOpen(false)
            vaciarCarrito()

        }catch(err){
            toast.error("Error al generar la venta", {id: toastId})
        }finally{
            set({isLoading: false, error: null})
        }
        // console.log(nuevaVenta)
    }

}))