import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TaskList from '@/models/TaskList';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  await dbConnect();
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  
  const taskLists = await TaskList.find({ userId });
  return NextResponse.json(taskLists);
}

export async function POST(request: Request) {
  const { name, owner, userId } = await request.json();
  await dbConnect();
  const taskList = await TaskList.create({ name, owner, userId });
  return NextResponse.json(taskList);
}
