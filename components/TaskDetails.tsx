'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"

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

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onUpdateTask(editedTask)
    handleClose()
  }

  const handleDelete = async () => {
    await onDeleteTask(task._id)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Update your task details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                type="text"
                placeholder="Task Title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                placeholder="Task Description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
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
            </div>
            <div className="grid gap-2">
              <Input
                type="text"
                placeholder="Assigned User"
                value={editedTask.assignedUser}
                onChange={(e) => setEditedTask({ ...editedTask, assignedUser: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
