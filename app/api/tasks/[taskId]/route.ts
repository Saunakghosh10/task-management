import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  await dbConnect();
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Task deleted successfully' });
}
