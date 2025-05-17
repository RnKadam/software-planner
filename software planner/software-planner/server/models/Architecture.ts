import mongoose, { Schema, Document } from "mongoose";

export interface IArchitecture extends Document {
  project: mongoose.Schema.Types.ObjectId;
  components: Array<{
    name: string;
    technology: string;
    description: string;
  }>;
  communication_flow: Array<{
    from: string;
    to: string;
    protocol: string;
  }>;
}

const ArchitectureSchema: Schema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  components: [
    {
      name: { type: String, required: true },
      technology: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  communication_flow: [
    {
      from: { type: String, required: true },
      to: { type: String, required: true },
      protocol: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IArchitecture>(
  "Architecture",
  ArchitectureSchema
);
