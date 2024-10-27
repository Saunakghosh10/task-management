import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TaskList from '@/models/TaskList';
import Task from '@/models/Task';

export async function DELETE(
  request: Request,
  { params }: { params: { taskListId: string } }
) {
  const { taskListId } = params;
  await dbConnect();

  // Delete the task list
  const deletedTaskList = await TaskList.findByIdAndDelete(taskListId);
  if (!deletedTaskList) {
    return NextResponse.json({ error: 'Task list not found' }, { status: 404 });
  }

  // Delete all tasks associated with this task list
  await Task.deleteMany({ taskListId });

  return NextResponse.json({ message: 'Task list and associated tasks deleted successfully' });
}
