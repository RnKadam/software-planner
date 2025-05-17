import mongoose, { Schema, Document } from "mongoose";

export interface ITimeline extends Document {
  project: mongoose.Schema.Types.ObjectId;
  timeline: Array<{
    phase: string;
    start_date: string;
    end_date: string;
    dependencies: string[];
  }>;
}

const TimelineSchema: Schema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  timeline: [
    {
      phase: { type: String, required: true },
      start_date: { type: String, required: true },
      end_date: { type: String, required: true },
      dependencies: { type: [String], required: true },
    },
  ],
});

export default mongoose.model<ITimeline>("Timeline", TimelineSchema);
