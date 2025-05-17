import mongoose, { Schema, Document } from "mongoose";

export interface ITechStack extends Document {
  project: mongoose.Schema.Types.ObjectId;
  frontend: { framework: string; libraries: string[]; tools: string[] };
  backend: { language: string; framework: string; server: string };
  database: { type: string; name: string };
  devops: { ci_cd: string; cloud: string };
  additional_tools: { testing: string[]; monitoring: string[] };
}

const TechStackSchema: Schema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  frontend: {
    framework: { type: String, required: true },
    libraries: { type: [String], required: true },
    tools: { type: [String], required: true },
  },
  backend: {
    language: { type: String, required: true },
    framework: { type: String, required: true },
    server: { type: String, required: true },
  },
  database: {
    type: { type: String, required: true },
    name: { type: String, required: true },
  },
  devops: {
    ci_cd: { type: String, required: true },
    cloud: { type: String, required: true },
  },
  additional_tools: {
    testing: { type: [String], required: true },
    monitoring: { type: [String], required: true },
  },
});

export default mongoose.model<ITechStack>("TechStack", TechStackSchema);
