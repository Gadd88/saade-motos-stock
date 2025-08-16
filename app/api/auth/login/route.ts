import UserModel, { IUser } from '@/components/models/User'
import dbConnect from '@/lib/mongodb'
import { type NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export async function POST(req: Request, res: Response){

    try{
        const { email, password }= await req.json()
        await dbConnect()
        const user = await UserModel.findOne({email})
        if(!user) return NextResponse.json({message: 'Usuario no encontrado'}, {status: 404})
        const hash = await bcrypt.hash('TitoSaade1996', 10)
        console.log("pass"+password, "hash"+hash, "user"+user)
        const match = await bcrypt.compare(password, user.password)
        
        //BCRYPT
        if(!match) return NextResponse.json({message: 'Credenciales inválidas'}, {status: 403})

        //TOKEN JWT
        const token = jwt.sign({
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET!,
            {expiresIn: "7d"}
        )

        //HTTPOnly
        const res = NextResponse.json({message: "Login Exitoso"})
        res.cookies.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return res;
    } catch (error){
        return NextResponse.json({message: "Error Interno"}, {status: 500})
    }
}