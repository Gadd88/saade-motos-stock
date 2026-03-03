import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const ventas = await prisma.ventas.findMany({
        orderBy:{
            createdAt: "desc"
        },
        include:{
            itemventa: {
                include: {
                    products: true
                }
            }
        }
    });
    return NextResponse.json(ventas);
}
