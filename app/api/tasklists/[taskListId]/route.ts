import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TaskList from '@/models/TaskList';
import Task from '@/models/Task';

export async function DELETE(
  request: Request,
  { params }: { params: { taskListId: string } }
) {
  const { taskListId } = params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  await dbConnect();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  // Delete the task list
  const deletedTaskList = await TaskList.findOneAndDelete({ _id: taskListId, userId });
  if (!deletedTaskList) {
    return NextResponse.json({ error: 'Task list not found' }, { status: 404 });
  }

  // Delete all tasks associated with this task list
  await Task.deleteMany({ taskListId, userId });

  return NextResponse.json({ message: 'Task list and associated tasks deleted successfully' });
}
