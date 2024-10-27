import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskListId = searchParams.get('taskListId');
  await dbConnect();
  const tasks = await Task.find({ taskListId });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const taskData = await request.json();
  await dbConnect();
  const task = await Task.create(taskData);
  return NextResponse.json(task);
}
