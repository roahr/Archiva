import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsPanel } from "@/components/settings-panel"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <SettingsPanel />
      </div>
    </DashboardLayout>
  )
}

