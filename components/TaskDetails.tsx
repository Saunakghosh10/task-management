'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type Task = {
  _id: string
  title: string
  description: string
  dueDate: string
  status: 'Not Started' | 'In Progress' | 'Completed'
  assignedUser: string
}

type TaskDetailsProps = {
  task: Task
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onClose: () => void
}

export function TaskDetails({ task, onUpdateTask, onDeleteTask, onClose }: TaskDetailsProps) {
  const [editedTask, setEditedTask] = useState(task)
  const [isOpen, setIsOpen] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateTask(editedTask)
    setIsOpen(false)
    onClose()
  }

  const handleDelete = () => {
    onDeleteTask(task._id)
    setIsOpen(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Task Title"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              required
            />
            <Textarea
              placeholder="Task Description"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              required
            />
            <Input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              required
            />
            <Select
              value={editedTask.status}
              onValueChange={(value: Task['status']) => setEditedTask({ ...editedTask, status: value })}
            >
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
              value={editedTask.assignedUser}
              onChange={(e) => setEditedTask({ ...editedTask, assignedUser: e.target.value })}
              required
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Update Task</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Delete Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
