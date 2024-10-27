import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const taskData = await request.json();
  await dbConnect();
  const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
  return NextResponse.json(updatedTask);
}
