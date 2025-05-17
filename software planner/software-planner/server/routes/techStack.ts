// import express from "express";
// import { generateTechStack } from "../services/openai.ts";
// import { validateProjectInput } from "../middleware/validation.ts";
// const router = express.Router();

// router.post("/", validateProjectInput, async (req, res) => {
//   try {
//     const techStack = await generateTechStack(req.body);
//     res.json({ techStack });
//   } catch (error) {
//     console.log("error:::", error);
//     res.status(500).json({ error: "Failed to generate tech stack" });
//   }
// });

// export default router;
