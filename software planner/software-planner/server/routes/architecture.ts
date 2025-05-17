// import express from "express";
// import { generateArchitecture } from "../services/openai.ts";
// import { validateProjectInput } from "../middleware/validation.ts";

// const router = express.Router();

// router.post("/", validateProjectInput, async (req, res) => {
//   try {
//     const architecture = await generateArchitecture(req.body);
//     res.json({ architecture });
//   } catch (error) {
//     console.log("error:::", error);
//     res.status(500).json({ error: "Failed to generate architecture" });
//   }
// });

// export default router;
