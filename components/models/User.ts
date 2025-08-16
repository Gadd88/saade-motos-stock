import mongoose, { type Document, Model, now, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Nombre de usuario requerido"],
      trim: true,
      maxlength: [50, "Nombre no puedo exceder los 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Email es requerido"],
      trim: true,
      maxlength: [100, "Email no puede exceder los 100 caracteres"],
    },
    password: {
      type: String,
      required: [true, "Password debe tener al menos 8 caracteres"],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
  },
  {
    timestamps: true,
  },
)

const UserModel : Model<IUser> = mongoose.models.varios || mongoose.model<IUser>("users", UserSchema, "users")
export default UserModel 
