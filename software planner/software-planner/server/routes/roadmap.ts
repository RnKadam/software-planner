// import express from "express";
// import { generateRoadmap } from "../services/openai.ts";
// import { validateProjectInput } from "../middleware/validation.ts";

// const router = express.Router();

// router.post("/", validateProjectInput, async (req, res) => {
//   try {
//     const roadmap = await generateRoadmap(req.body);
//     res.json({ roadmap });
//   } catch (error) {
//     console.log("error:::", error);
//     res.status(500).json({ error: "Failed to generate roadmap" });
//   }
// });

// export default router;
