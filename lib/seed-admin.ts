
import bcrypt from "bcrypt";
import dbConnect from "./mongodb";
import UserModel from "@/models/User";

export const seedAdmin = async () => {
    try {
        const adminEmail = "leonardosaade18@gmail.com";
        const adminPassword = "TitoSaade1996";

        const existAdmin = await UserModel.findOne({ role: "admin" });

        if (existAdmin) {
            console.log("Ya existe un usuario ADMIN");
            return
            // process.exit(0);
        }
        const hashed = await bcrypt.hash(adminPassword, 10);
        const newAdmin = new UserModel({
            name: "Tito Saade",
            email: adminEmail,
            password: hashed,
            role: "admin",
        });
        await newAdmin.save();
        console.log("Usuario admin creado con éxito");
        // process.exit(0)
    } catch (error) {
        console.log(error, " Error al crear el admin");
        // process.exit(1)
    }
};

