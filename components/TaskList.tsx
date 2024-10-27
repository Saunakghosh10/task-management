'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CreateTask from './CreateTask'
import { TaskDetails } from './TaskDetails'

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'Not Started' | 'In Progress' | 'Completed'
  assignedUser: string
}

type TaskListProps = {
  taskListId: string
}

export default function TaskList({ taskListId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleCreateTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
    setShowCreateTask(false)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setSelectedTask(null)
  }

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.id} className="mb-4">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>Due: {task.dueDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Status: {task.status}</p>
            <p>Assigned to: {task.assignedUser}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSelectedTask(task)}>View Details</Button>
          </CardFooter>
        </Card>
      ))}
      {showCreateTask ? (
        <CreateTask onCreateTask={handleCreateTask} taskListId={taskListId} />
      ) : (
        <Button onClick={() => setShowCreateTask(true)} className="mt-4">
          Add New Task
        </Button>
      )}
      {selectedTask && (
        <TaskDetails task={selectedTask} onUpdateTask={handleUpdateTask} />
      )}
    </div>
  )
}