import { DashboardLayout } from "@/components/dashboard-layout"
import { DeployContract } from "@/components/deploy-contract"

export default function DeployPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Deploy New Contract</h1>
        <DeployContract />
      </div>
    </DashboardLayout>
  )
}

