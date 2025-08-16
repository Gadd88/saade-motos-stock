import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/components/models/Product";

export async function GET(){
    try{
        const db = await dbConnect()
        const productos = await Product.find()
        return NextResponse.json({success: true, message: 'BBDD CONECTADA', productos: productos})
    }catch(error){
        console.error(error)
        return NextResponse.json({sucess: false, message: 'FALLÓ LA CONEXION'}, {status: 500})
    }
}