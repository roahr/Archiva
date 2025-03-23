import { DashboardLayout } from "@/components/dashboard-layout"
import { ContractDetails } from "@/components/contract-details"

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <div className="p-6">
        <ContractDetails id={params.id} />
      </div>
    </DashboardLayout>
  )
}

