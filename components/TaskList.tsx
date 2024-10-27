'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CreateTask from './CreateTask'
import { TaskDetails } from './TaskDetails'

type Task = {
  _id: string
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

  useEffect(() => {
    fetchTasks();
  }, [taskListId]);

  const fetchTasks = async () => {
    const response = await fetch(`/api/tasks?taskListId=${taskListId}`);
    const data = await response.json();
    setTasks(data);
  };

  const handleCreateTask = async (newTask: Omit<Task, '_id'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, taskListId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setShowCreateTask(false);
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  const handleUpdateTask = async (updatedTask: Task) => {
    const response = await fetch(`/api/tasks/${updatedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const updatedTaskData = await response.json();
    setTasks(tasks.map(task => task._id === updatedTaskData._id ? updatedTaskData : task));
    setSelectedTask(null);
  }

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task._id} className="mb-4">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>Due: {new Date(task.dueDate).toLocaleDateString()}</CardDescription>
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
