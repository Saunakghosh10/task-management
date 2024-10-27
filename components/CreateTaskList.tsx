'use client'

import { useState } from 'react'
import { User } from '@clerk/nextjs/server'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type TaskList = {
  name: string
  owner: string
}

type CreateTaskListProps = {
  onCreateTaskList: (taskList: TaskList) => void
  user: User
}

export function CreateTaskList({ onCreateTaskList, user }: CreateTaskListProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      const newTaskList: TaskList = {
        name: name.trim(),
        owner: `${user.firstName} ${user.lastName}`.trim(), // Use full name
      }
      onCreateTaskList(newTaskList)
      setName('')
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Create New Task List</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            type="text"
            placeholder="Task List Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Create Task List</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
