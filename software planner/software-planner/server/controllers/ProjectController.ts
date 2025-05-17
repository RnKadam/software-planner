import mongoose from "mongoose";
import Project from "../models/Project.ts";
import Timeline from "../models/Timeline.ts";
import TechStack from "../models/TechStack.ts";
import Roadmap from "../models/Roadmap.ts";
import Architecture from "../models/Architecture.ts";
import {
  generateTimeline,
  generateTechStack,
  generateRoadmap,
  generateArchitecture,
} from "../services/openai.ts";

export const createProject = async (req, res) => {
  const { projectName, description, requirements, industry, budget } = req.body;

  try {
    // Create and save the project
    const project = new Project({
      projectName,
      description,
      requirements,
      industry,
      budget,
    });
    await project.save();

    // Generate and save timeline
    const timelineData = await generateTimeline(req.body);
    const timeline = new Timeline({
      project: project._id,
      timeline: timelineData.timeline,
    });
    await timeline.save();

    // Generate and save tech stack
    const techStackData = await generateTechStack(req.body);
    const techStack = new TechStack({
      project: project._id,
      ...techStackData,
    });
    await techStack.save();

    // Generate and save roadmap
    const roadmapData = await generateRoadmap(req.body);
    const roadmap = new Roadmap({
      project: project._id,
      milestones: roadmapData.milestones,
    });
    await roadmap.save();

    // Generate and save architecture
    const architectureData = await generateArchitecture(req.body);
    const architecture = new Architecture({
      project: project._id,
      ...architectureData,
    });
    await architecture.save();

    // Update project with references to the related documents
    project.timeline = timeline._id as mongoose.Schema.Types.ObjectId;
    project.techStack = techStack._id as mongoose.Schema.Types.ObjectId;
    project.roadmap = roadmap._id as mongoose.Schema.Types.ObjectId;
    project.architecture = architecture._id as mongoose.Schema.Types.ObjectId;
    await project.save();

    const timelineDoc = await Timeline.findById(timeline._id);
    const techStackDoc = await TechStack.findById(techStack._id);
    const roadmapDoc = await Roadmap.findById(roadmap._id);
    const architectureDoc = await Architecture.findById(architecture._id);

    // Construct the full response
    const populatedProject = {
      ...project.toObject(),
      timeline: timelineDoc,
      techStack: techStackDoc,
      roadmap: roadmapDoc,
      architecture: architectureDoc,
    };

    if (!populatedProject) {
      throw new Error("Failed to populate project data");
    }

    // Send the full response
    res.status(201).json({ project: populatedProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ error: "Failed to create project", details: error.message });
  }
};

// import mongoose from "mongoose";
// import Project from "../models/Project.ts";
// import Timeline from "../models/Timeline.ts";
// import TechStack from "../models/TechStack.ts";
// import Roadmap from "../models/Roadmap.ts";
// import Architecture from "../models/Architecture.ts";
// import {
//   generateTimeline,
//   generateTechStack,
//   generateRoadmap,
//   generateArchitecture,
// } from "../services/openai.ts";

// export const createProject = async (req, res) => {
//   const { projectName, description, requirements, industry, budget } = req.body;

//   try {
//     const project = new Project({
//       projectName,
//       description,
//       requirements,
//       industry,
//       budget,
//     });
//     await project.save();

//     const timelineData = await generateTimeline(req.body);
//     const timeline = new Timeline({
//       project: project._id,
//       timeline: timelineData.timeline,
//     });
//     await timeline.save();

//     const techStackData = await generateTechStack(req.body);
//     const techStack = new TechStack({
//       project: project._id,
//       ...techStackData,
//     });
//     await techStack.save();

//     const roadmapData = await generateRoadmap(req.body);
//     const roadmap = new Roadmap({
//       project: project._id,
//       milestones: roadmapData.milestones,
//     });
//     await roadmap.save();

//     const architectureData = await generateArchitecture(req.body);
//     const architecture = new Architecture({
//       project: project._id,
//       ...architectureData,
//     });
//     await architecture.save();

//     project.timeline = timeline._id as mongoose.Schema.Types.ObjectId;
//     project.techStack = techStack._id as mongoose.Schema.Types.ObjectId;
//     project.roadmap = roadmap._id as mongoose.Schema.Types.ObjectId;
//     project.architecture = architecture._id as mongoose.Schema.Types.ObjectId;
//     await project.save();

//     res.status(201).json({ project });
//   } catch (error) {
//     console.error("Error creating project:", error);
//     res.status(500).json({ error: "Failed to create project" });
//   }
// };
