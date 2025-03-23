import { DashboardLayout } from "@/components/dashboard-layout"
import { ArchivalManagement } from "@/components/archival-management"

export default function ArchivalPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Archival Management</h1>
        <ArchivalManagement />
      </div>
    </DashboardLayout>
  )
}

