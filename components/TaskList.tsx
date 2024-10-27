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
  userId: string
}

export default function TaskList({ taskListId, userId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks();
  }, [taskListId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks?taskListId=${taskListId}&userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      // Ensure data is an array
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks');
      setTasks([]);
    }
  };

  const handleCreateTask = async (newTask: Omit<Task, '_id'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, taskListId, userId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setShowCreateTask(false);
      setError(null);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  }

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedTask, userId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const updatedTaskData = await response.json();
      setTasks(tasks.map(task => task._id === updatedTaskData._id ? updatedTaskData : task));
      setSelectedTask(null);
      setError(null);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}?userId=${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(tasks.filter(task => task._id !== taskId));
      setError(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  }

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
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
            <Button onClick={() => setSelectedTask(task)} className="mr-2">View Details</Button>
            <Button variant="destructive" onClick={() => handleDeleteTask(task._id)}>Delete</Button>
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
        <TaskDetails 
          task={selectedTask} 
          onUpdateTask={handleUpdateTask} 
          onDeleteTask={handleDeleteTask}
          onClose={handleCloseTaskDetails}
        />
      )}
    </div>
  )
}
