import { KanbanBoard } from '@/components/kanban-board'
import { GanttChart } from '@/components/gantt-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban">
          <KanbanBoard projectId={params.id} />
        </TabsContent>
        <TabsContent value="gantt">
          <GanttChart projectId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}