import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/components/models/Product"

// GET /api/products - Get all products
export async function GET() {
  try {
    await dbConnect()
    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()

    const product = await Product.create(body)
    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to create product" }, { status: 400 })
  }
}
