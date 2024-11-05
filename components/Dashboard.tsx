'use client'

import { useState, useEffect } from 'react'
import { User } from '@clerk/nextjs/server'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreateTaskList } from './CreateTaskList'
import TaskList from './TaskList'
import { UserButton } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Menu, Plus, Layout, Search } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ThemeToggle } from "@/components/theme-toggle"

type TaskList = {
  _id: string
  name: string
  owner: string // This will now contain the full name
}

export function Dashboard({ user }: { user: User }) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([])
  const [showCreateTaskList, setShowCreateTaskList] = useState(false)
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    const response = await fetch(`/api/tasklists?userId=${user.id}`);
    const data = await response.json();
    setTaskLists(data);
  };

  const handleCreateTaskList = async (newTaskList: Omit<TaskList, '_id'>) => {
    const response = await fetch('/api/tasklists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTaskList),
    });
    const createdTaskList = await response.json();
    setTaskLists([...taskLists, createdTaskList]);
    setShowCreateTaskList(false);
  }

  const handleDeleteTaskList = async (taskListId: string) => {
    try {
      const response = await fetch(`/api/tasklists/${taskListId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task list');
      }
      setTaskLists(taskLists.filter(list => list._id !== taskListId));
    } catch (error) {
      console.error('Error deleting task list:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      // Refresh the task lists after deletion
      fetchTaskLists();
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  const sidebarVariants = {
    open: { x: 0, width: isDesktop ? "250px" : "100%" },
    closed: { x: isDesktop ? -250 : -1000, width: isDesktop ? "250px" : "100%" }
  }

  const mainContentVariants = {
    open: { marginLeft: isDesktop ? "250px" : 0 },
    closed: { marginLeft: 0 }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <motion.div 
        className="fixed inset-y-0 left-0 bg-black border-r border-gray-800 z-30"
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <span className="text-xl font-medium text-gray-200">Task Manager</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="px-4 pt-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-900 rounded-md border border-gray-800">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent border-none focus:outline-none text-sm text-gray-200 placeholder-gray-500 w-full"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {taskLists.map((list) => (
              <motion.div
                key={list._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-1"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left px-2 py-1.5 text-gray-300 hover:bg-gray-800 hover:text-white rounded-sm"
                  onClick={() => {/* Handle list selection */}}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  {list.name}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <Button 
              onClick={() => setShowCreateTaskList(true)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              New List
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 overflow-hidden"
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={mainContentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full flex flex-col bg-black">
          {/* Header */}
          <header className="border-b border-gray-800 p-4 flex items-center justify-between bg-black">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-200">Welcome, {user.firstName}!</span>
              <ThemeToggle />
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </header>

          {/* Task Lists Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-black">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {taskLists.map((taskList) => (
                <motion.div
                  key={taskList._id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="h-full bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                    <TaskList taskListId={taskList._id} userId={user.id} />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Create Task List Modal */}
      {showCreateTaskList && (
        <CreateTaskList onCreateTaskList={handleCreateTaskList} user={user} />
      )}
    </div>
  )
}
