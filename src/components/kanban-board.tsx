"use client"

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function KanbanBoard({ projectId }) {
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

  const onDragEnd = (result) => {
    // Implement drag and drop logic here
  }

  const columns = ['To Do', 'In Progress', 'Done']

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <div key={column} className="w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>{column}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column}>
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks
                        .filter((task) => task.status === column)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-2 mb-2 rounded shadow"
                              >
                                {task.title}
                              </li>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}