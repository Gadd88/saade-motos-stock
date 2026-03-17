import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    console.log("DATABASE_URL presente:", !!process.env.DATABASE_URL);
  console.log("DATABASE_URL longitud:", process.env.DATABASE_URL?.length);
  
    const products = await prisma.products.findMany({
        where: { availability: true },
    });
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const body = await req.json();
    const product = await prisma.products.create({ data: body });
    return NextResponse.json(product, { status: 201 });
}
