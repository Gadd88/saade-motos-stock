import mongoose, { type Document, Model, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [500, "Product description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    category: {
      type: String,
      default: "varios",
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for better query performance
// ProductSchema.index({ name: "text", description: "text" })
// ProductSchema.index({ category: 1 })
// ProductSchema.index({ stock: 1 })

const ProductModel : Model<IProduct> = mongoose.models.varios || mongoose.model<IProduct>("varios", ProductSchema, "varios")
export default ProductModel 
