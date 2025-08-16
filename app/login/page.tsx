import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b-4 border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary neo-button"></div>
              <span className="neo-heading text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                SAADE MOTOS
              </span>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="neo-button font-semibold bg-transparent"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                VOLVER
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h1 className="neo-heading text-4xl" style={{ fontFamily: "var(--font-montserrat)" }}>
              ADMIN LOGIN
            </h1>
            <p className="text-muted-foreground">Ingresa a tu sistema de stock</p>
          </div>

          <LoginForm />

          {/* <div className="neo-card p-4 bg-muted">
            <h3 className="neo-heading text-sm mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
              DEMO CREDENTIALS
            </h3>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>Email: admin@saademotos.com</div>
              <div>Password: admin123</div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  )
}
