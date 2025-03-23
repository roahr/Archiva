import { DashboardLayout } from "@/components/dashboard-layout"
import { PlaygroundContent } from "@/components/playground-content"

export default function PlaygroundPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Developer Playground</h1>
        <PlaygroundContent />
      </div>
    </DashboardLayout>
  )
} 