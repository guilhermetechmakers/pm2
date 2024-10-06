import { ProjectList } from '@/components/project-list'
import { ProjectStatus } from '@/components/project-status'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectStatus />
        <ProjectList />
      </div>
    </div>
  )
}