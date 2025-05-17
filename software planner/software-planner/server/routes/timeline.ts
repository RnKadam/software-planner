// import express from "express";
// import { generateTimeline } from "../services/openai.ts";
// import { validateProjectInput } from "../middleware/validation.ts";

// const router = express.Router();

// router.post("/", validateProjectInput, async (req, res) => {
//   try {
//     const timeline = await generateTimeline(req.body);
//     res.json({ timeline });
//   } catch (error) {
//     console.log("error:::", error);
//     res.status(500).json({ error: "Failed to generate timeline" });
//   }
// });

// export default router;
