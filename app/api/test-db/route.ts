import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import bcrypt from 'bcrypt'
import UserModel from "@/models/User";
import { seedAdmin } from "@/lib/seed-admin";

export async function GET(){

    try{
        await dbConnect()
        const productos = await Product.find()
        // await seedAdmin()
        return NextResponse.json({success: true, message: 'BBDD CONECTADA', productos: productos})
    }catch(error){
        console.error(error)
        return NextResponse.json({sucess: false, message: 'FALLÓ LA CONEXION'}, {status: 500})
    }
}