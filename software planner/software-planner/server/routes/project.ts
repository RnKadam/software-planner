import express from "express";
import { createProject } from "../controllers/ProjectController.ts";
import { validateProjectInput } from "../middleware/validation.ts";

const router = express.Router();

router.post("/", validateProjectInput, createProject);

export default router;
