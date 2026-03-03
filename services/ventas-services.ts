


export const obtenerVentas = async () => {
    const response = await fetch('/api/ventas', {
        cache: "no-store"
    })
    const result = await response.json()
    return result
}

