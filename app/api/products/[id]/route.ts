// app/api/products/[id]/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try{
        const producto = await prisma.products.findUnique({ where: { id: Number(id) } })
        if (!producto) return NextResponse.json("Producto no encontrado", { status: 404 })
        return NextResponse.json(producto)
    }catch(error){
        return NextResponse.json({error: `Ocurrió un error en el servidor, ${error}`}, {status: 500})
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const body = await req.json();
    const product = await prisma.products.update({
        where: { id: Number(id) },
        data: body,
    });
    return NextResponse.json(product);
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        await prisma.products.update({
            where: { id: Number(id) },
            data: { availability: false },
        });
        // await prisma.products.delete({ where: { id: Number(params.id) } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json(
            { ok: false, error: `Error al eliminar el producto, ${error}` },
            { status: 500 },
        );
    }
}

// import { type NextRequest, NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import Product from "@/models/Product"
// import mongoose from "mongoose"

// // GET /api/products/[id] - Get a single product
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect()

//     const { id } = await params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
//     }

//     const product = await Product.findById(id)
//     if (!product) {
//       return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true, data: product })
//   } catch (error) {
//     console.error("Error fetching product:", error)
//     return NextResponse.json({ success: false, error: "Error al cargar producto" }, { status: 500 })
//   }
// }

// // PUT /api/products/[id] - Update a product
// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect()

//     const { id } = await params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
//     }

//     const body = await request.json()
//     const product = await Product.findByIdAndUpdate(id, body, {
//       new: true,
//       runValidators: true,
//     })

//     if (!product) {
//       return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true, data: product })
//   } catch (error: any) {
//     console.error("Error actualizando el producto:", error)
//     return NextResponse.json({ success: false, error: error.message || "Error al actualizar el producto" }, { status: 400 })
//   }
// }

// // DELETE /api/products/[id] - Delete a product
// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect()
//     const { id } = await params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 })
//     }

//     const product = await Product.findByIdAndDelete(id)
//     if (!product) {
//       return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true, data: product })
//   } catch (error) {
//     console.error("Error al borrar el producto..", error)
//     return NextResponse.json({ success: false, error: "Fallo al eliminar el producto" }, { status: 500 })
//   }
// }
