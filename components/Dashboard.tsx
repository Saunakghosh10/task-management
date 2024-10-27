'use client'

import { useState, useEffect } from 'react'
import { User } from '@clerk/nextjs/server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { CreateTaskList } from './CreateTaskList'
import TaskList from './TaskList'
import { UserButton, useClerk } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

type TaskList = {
  _id: string
  name: string
  owner: string // This will now contain the full name
}

export function Dashboard({ user }: { user: User }) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([])
  const [showCreateTaskList, setShowCreateTaskList] = useState(false)
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    const response = await fetch('/api/tasklists');
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

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taskLists.map((taskList) => (
          <Card key={taskList._id}>
            <CardHeader>
              <CardTitle>{taskList.name}</CardTitle>
              <CardDescription>Owner: {taskList.owner}</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList taskListId={taskList._id} />
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => handleDeleteTaskList(taskList._id)}>Delete List</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {showCreateTaskList ? (
        <CreateTaskList onCreateTaskList={handleCreateTaskList} user={user} />
      ) : (
        <Button onClick={() => setShowCreateTaskList(true)} className="mt-4">
          Create New Task List
        </Button>
      )}
    </div>
  )
}
