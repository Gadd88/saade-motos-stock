import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth-store"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock <= 5
  const isOutOfStock = product.stock === 0
  const { user } = useAuthStore()

  return (
    <div className="neo-card p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_theme(colors.border)] transition-all duration-200">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover border-2 border-border"
        />
        <div className="absolute top-2 right-2">
          {isOutOfStock ? (
            <Badge variant="destructive" className="neo-button text-xs font-bold">
              SIN STOCK
            </Badge>
          ) : isLowStock ? (
            <Badge variant="secondary" className="neo-button text-xs font-bold bg-yellow-400 text-black border-black">
              BAJO STOCK
            </Badge>
          ) : (
            <Badge variant="outline" className="neo-button text-xs font-bold">
              CON STOCK
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="neo-heading text-lg leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="neo-heading text-2xl text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
            ${product.price}
          </div>
          {/* <div className="text-xs text-muted-foreground">{product.stock} in stock</div> */}
        </div>
        {
          user &&
          <Button
            variant={isOutOfStock ? "secondary" : "default"}
            disabled={isOutOfStock}
            className="neo-button font-bold"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {isOutOfStock ? "SIN STOCK" : "DETALLES"}
          </Button>
        }
      </div>
    </div>
  )
}
