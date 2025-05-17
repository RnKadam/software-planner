import mongoose, { Schema, Document } from "mongoose";

export interface IRoadmap extends Document {
  project: mongoose.Schema.Types.ObjectId;
  milestones: Array<{
    phase: string;
    tasks: string[];
    timeline: string;
    best_practices: string;
  }>;
}

const RoadmapSchema: Schema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  milestones: [
    {
      phase: { type: String, required: true },
      tasks: { type: [String], required: true },
      timeline: { type: String, required: true },
      best_practices: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IRoadmap>("Roadmap", RoadmapSchema);
