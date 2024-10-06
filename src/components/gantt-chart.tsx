"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Chart } from 'react-google-charts'

export function GanttChart({ projectId }) {
  const [tasks, setTasks] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
      
      if (error) {
        console.error('Error fetching tasks:', error)
      } else {
        setTasks(data)
      }
    }

    fetchTasks()
  }, [projectId])

  const chartData = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...tasks.map((task) => [
      task.id.toString(),
      task.title,
      new Date(task.start_date),
      new Date(task.end_date),
      null,
      task.progress,
      null,
    ]),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gantt Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            height: 400,
            gantt: {
              trackHeight: 30,
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </CardContent>
    </Card>
  )
}