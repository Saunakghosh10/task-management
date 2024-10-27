import mongoose from 'mongoose';

const TaskListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.models.TaskList || mongoose.model('TaskList', TaskListSchema);
