import { DashboardLayout } from "@/components/dashboard-layout"
import { ContractHub } from "@/components/contract-hub"

export default function HubPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Contract Hub</h1>
        <ContractHub />
      </div>
    </DashboardLayout>
  )
} 