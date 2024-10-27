import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  assignedUser: { type: String, required: true },
  taskListId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskList', required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
