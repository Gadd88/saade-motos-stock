import { ProductGrid } from "@/components/product-grid"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="neo-heading text-4xl md:text-6xl mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
            SAADE MOTOS
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Repuestos y accesorios premium para motos. Encontrá todo lo que necesitás para mantener tu moto en el máximo rendimiento.
          </p>
        </div>
        <ProductGrid />
      </main>
    </div>
  )
}
