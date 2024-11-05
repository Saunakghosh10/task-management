'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CreateTask from './CreateTask'
import { TaskDetails } from './TaskDetails'
import { motion, AnimatePresence } from "framer-motion"
import { Plus, CheckCircle, Circle, Clock } from "lucide-react"
import gsap from 'gsap'

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

  useEffect(() => {
    // GSAP animation for task status changes
    gsap.fromTo(".task-status",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 }
    )
  }, [tasks])

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
      setTasks(prevTasks => [...prevTasks, createdTask]);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedTask, userId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const updated = await response.json();
      setTasks(prevTasks => 
        prevTasks.map(task => task._id === updated._id ? updated : task)
      );
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
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      setSelectedTask(null);
      setError(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  }

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="text-red-500 text-sm p-2 bg-red-50 rounded"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            className="task-item"
            onClick={() => setSelectedTask(task)}
          >
            <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <span className="task-status" onClick={e => e.stopPropagation()}>
                  {getStatusIcon(task.status)}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4"
      >
        {showCreateTask ? (
          <CreateTask onCreateTask={handleCreateTask} taskListId={taskListId} />
        ) : (
          <Button
            onClick={() => setShowCreateTask(true)}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedTask && (
          <TaskDetails
            key={selectedTask._id}
            task={selectedTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onClose={handleCloseTaskDetails}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
