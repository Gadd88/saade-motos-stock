import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const ventas = await prisma.ventas.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            itemventa: {
                include: {
                    products: true,
                },
            },
        },
    });
    return NextResponse.json(ventas);
}

export async function POST(req: NextRequest, res: NextResponse) {
    const items: { id: number; quantity: number }[] = await req.json();

    try {
        const resultado = await prisma.$transaction(async (tx) => {
            let total = 0;
            let totalGastado = 0;

            //genero la venta
            const venta = await tx.ventas.create({
                data: {
                    fecha: new Date(),
                    total: 0,
                    totalGastado: 0,
                    updatedAt: new Date(),
                },
            });

            for (const item of items) {
                const producto = await tx.products.findUnique({
                    where: { id: item.id },
                });

                if (!producto || producto.quantity <= item.quantity) {
                    throw new Error(
                        `Producto inválido o sin stock suficiente: ID - ${item.id}`,
                    );
                }

                const precioUnitario = producto.priceSale;
                const precioCompra = producto.priceBuy;
                total += precioUnitario * item.quantity;
                totalGastado += precioCompra * item.quantity;

                //descontamos stock
                await tx.products.update({
                    where: {
                        id: producto.id,
                    },
                    data: {
                        quantity: producto.quantity - item.quantity,
                    },
                });

                //creamos item de venta
                await tx.itemventa.create({
                    data: {
                        idVenta: venta.id,
                        idProducto: producto.id,
                        cantidad: item.quantity,
                        precioUnitario: producto.priceSale,
                        precioCompra: producto.priceBuy,
                        updatedAt: new Date(),
                    },
                });
            }

            //actualizamos total de la venta
            const ventaFinal = await tx.ventas.update({
                where: { id: venta.id },
                data: {
                    total: +total.toFixed(2),
                    totalGastado: +totalGastado.toFixed(2),
                },
            });

            return ventaFinal;
        });

        return NextResponse.json(
            {
                idVentas: resultado.id,
                total: resultado.total,
                totalGastado: resultado.totalGastado,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Error al generar venta", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Error al generar venta",
            },
            { status: 400 },
        );
    }
}
