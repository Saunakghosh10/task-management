import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  await dbConnect();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!deletedTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Task deleted successfully' });
}
