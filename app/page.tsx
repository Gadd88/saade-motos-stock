import { ProductGrid } from "@/components/producto/product-grid"
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
        </div>
        <ProductGrid />
      </main>
    </div>
  )
}
