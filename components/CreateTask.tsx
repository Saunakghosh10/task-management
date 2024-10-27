'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Task = {
  title: string
  description: string
  dueDate: string
  status: 'Not Started' | 'In Progress' | 'Completed'
  assignedUser: string
}

type CreateTaskProps = {
  onCreateTask: (task: Task) => void
  taskListId: string
}

export default function CreateTask({ onCreateTask, taskListId }: CreateTaskProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState<Task['status']>('Not Started')
  const [assignedUser, setAssignedUser] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && description && dueDate && status && assignedUser) {
      const newTask: Task = {
        title,
        description,
        dueDate,
        status,
        assignedUser,
      }
      onCreateTask(newTask)
      // Reset form fields
      setTitle('')
      setDescription('')
      setDueDate('')
      setStatus('Not Started')
      setAssignedUser('')
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <Select value={status} onValueChange={(value: Task['status']) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Assigned User"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Create Task</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
