import mongoose from 'mongoose';

const TaskListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true }, // This will store the full name
  // ... any other fields you have
});

export default mongoose.models.TaskList || mongoose.model('TaskList', TaskListSchema);
