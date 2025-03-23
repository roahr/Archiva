import { DashboardLayout } from "@/components/dashboard-layout"
import { ContractsTable } from "@/components/contracts-table"

export default function ContractsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Smart Contracts</h1>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contracts..."
                className="px-4 py-2 pr-8 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
        <ContractsTable />
      </div>
    </DashboardLayout>
  )
}

