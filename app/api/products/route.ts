
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.products.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await prisma.products.create({ data: body });
  return NextResponse.json(product, {status: 201});
}