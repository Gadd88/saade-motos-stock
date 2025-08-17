import mongoose, { type Document, Model, Schema } from "mongoose"

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
      trim: true,
      maxlength: [50, "Nombre no puedo exceder los 50 caracteres"],
    },
    email: {
      type: String,
      trim: true,
      maxlength: [100, "Email no puede exceder los 100 caracteres"],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true,
  },
)

const UserModel : Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default UserModel 
