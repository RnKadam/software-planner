import { GoogleGenerativeAI } from "@google/generative-ai";
import { ProjectDetails } from "../types/architecture";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateArchitecture(details: ProjectDetails) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `you are an System architecture who designs architecture diagram for a project.
  Generate system architecture for ${details.name} with:
  - Frontend: ${details.frontend}
  - Backend: ${details.backend}
  - Database: ${details.database}
  - Features: ${details.features.join(", ")}
  Give me mermaid code for the architecture diagram
  Just give the code , do not say anything else`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    throw new Error("Failed to generate architecture");
  }
}
