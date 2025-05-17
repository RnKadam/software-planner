import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  description: string;
  requirements: string[];
  industry: string;
  budget: number;
  timeline?: mongoose.Schema.Types.ObjectId;
  techStack?: mongoose.Schema.Types.ObjectId;
  roadmap?: mongoose.Schema.Types.ObjectId;
  architecture?: mongoose.Schema.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  industry: { type: String, required: true },
  budget: { type: Number, required: true },
  timeline: { type: Schema.Types.ObjectId, ref: "Timeline" },
  techStack: { type: Schema.Types.ObjectId, ref: "TechStack" },
  roadmap: { type: Schema.Types.ObjectId, ref: "Roadmap" },
  architecture: { type: Schema.Types.ObjectId, ref: "Architecture" },
});

export default mongoose.model<IProject>("Project", ProjectSchema);