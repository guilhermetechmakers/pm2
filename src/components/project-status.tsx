"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function ProjectStatus() {
  const [status, setStatus] = useState({ total: 0, completed: 0, inProgress: 0 })
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchProjectStatus = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('status')
      
      if (error) {
        console.error('Error fetching project status:', error)
      } else {
        const total = data.length
        const completed = data.filter(p => p.status === 'completed').length
        const inProgress = total - completed
        setStatus({ total, completed, inProgress })
      }
    }

    fetchProjectStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{status.total}</p>
            <p className="text-sm text-gray-500">Total Projects</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-500">{status.completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-500">{status.inProgress}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}