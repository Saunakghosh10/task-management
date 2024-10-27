import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TaskList from '@/models/TaskList';

export async function GET() {
  await dbConnect();
  const taskLists = await TaskList.find({});
  return NextResponse.json(taskLists);
}

export async function POST(request: Request) {
  const { name, owner } = await request.json();
  await dbConnect();
  const taskList = await TaskList.create({ name, owner });
  return NextResponse.json(taskList);
}
