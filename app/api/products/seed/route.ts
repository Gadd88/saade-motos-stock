import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/components/models/Product"

const seedProducts = [
  {
    name: "High Performance Air Filter",
    description: "Premium air filter for enhanced engine performance and longevity. Compatible with most sport bikes.",
    price: 45.99,
    stock: 12,
    image: "/motorcycle-air-filter.png",
    category: "Engine Parts",
  },
  {
    name: "LED Headlight Assembly",
    description: "Ultra-bright LED headlight with modern design. Easy installation and long-lasting durability.",
    price: 189.99,
    stock: 3,
    image: "/placeholder-9642d.png",
    category: "Lighting",
  },
  {
    name: "Carbon Fiber Exhaust Pipe",
    description: "Lightweight carbon fiber exhaust system for improved performance and aggressive sound.",
    price: 299.99,
    stock: 8,
    image: "/placeholder-mguw1.png",
    category: "Exhaust",
  },
  {
    name: "Brake Pad Set - Front",
    description: "High-quality ceramic brake pads for superior stopping power and reduced brake dust.",
    price: 67.5,
    stock: 15,
    image: "/placeholder-nefz5.png",
    category: "Brakes",
  },
  {
    name: "Chain and Sprocket Kit",
    description: "Complete drive chain and sprocket set for smooth power transmission and extended life.",
    price: 124.99,
    stock: 2,
    image: "/motorcycle-chain-sprocket-kit.png",
    category: "Drive Train",
  },
  {
    name: "Racing Mirrors - Pair",
    description: "Aerodynamic racing mirrors with anti-glare coating. Lightweight aluminum construction.",
    price: 89.99,
    stock: 7,
    image: "/placeholder-mnuyg.png",
    category: "Accessories",
  },
]

// POST /api/products/seed - Seed the database with initial products
export async function POST() {
  try {
    await dbConnect()

    // Clear existing products
    await Product.deleteMany({})

    // Insert seed products
    const products = await Product.insertMany(seedProducts)

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${products.length} products`,
      data: products,
    })
  } catch (error: any) {
    console.error("Error seeding products:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to seed products" }, { status: 500 })
  }
}
