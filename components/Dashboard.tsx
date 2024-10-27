'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CreateTask from './CreateTask'
import { CreateTaskList } from './CreateTaskList'
import TaskList from './TaskList'

type User = {
  firstName: string;
  id: string;
  fullName: string;
  username: string;
}

type TaskList = {
  id: string
  name: string
  owner: string
}

export function Dashboard({ user }: { user: User }) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([])
  const [showCreateTaskList, setShowCreateTaskList] = useState(false)

  const handleCreateTaskList = (newTaskList: TaskList) => {
    setTaskLists([...taskLists, newTaskList])
    setShowCreateTaskList(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taskLists.map((taskList) => (
          <Card key={taskList.id}>
            <CardHeader>
              <CardTitle>{taskList.name}</CardTitle>
              <CardDescription>Owner: {taskList.owner}</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList taskListId={taskList.id} />
            </CardContent>
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
