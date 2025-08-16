import { ProtectedRoute } from "@/components/protected-route"
import { InventoryManager } from "@/components/inventory-manager"

export default function InventoryPage() {
  return (
    <ProtectedRoute>
      <InventoryManager />
    </ProtectedRoute>
  )
}
