import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskListId = searchParams.get('taskListId');
  const userId = searchParams.get('userId');
  
  await dbConnect();
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  
  if (taskListId) {
    const tasks = await Task.find({ taskListId, userId });
    return NextResponse.json(tasks);
  } else {
    const tasks = await Task.find({ userId });
    return NextResponse.json(tasks);
  }
}

export async function POST(request: Request) {
  const taskData = await request.json();
  await dbConnect();
  const task = await Task.create(taskData);
  return NextResponse.json(task);
}
