import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const updateData = await request.json();
  
  try {
    await dbConnect();
    const task = await Task.findByIdAndUpdate(
      taskId,
      { ...updateData },
      { new: true }
    );
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    await dbConnect();
    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
