import OpenAI from "openai";
import {
  TECH_STACK_PROMPT,
  ROADMAP_PROMPT,
  TIMELINE_PROMPT,
  ARCHITECTURE_PROMPT,
} from ".././prompts.ts";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoadmap(projectDetails: any) {
  const prompt = ROADMAP_PROMPT.replace(
    /{(\w+)}/g,
    (_, key) => projectDetails[key] || ""
  );
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
  });
  let content = response.choices[0].message?.content || "{}";
  content = content.replace(/```json|```/g, "").trim();

  return JSON.parse(content);
}

export async function generateTechStack(projectDetails: any) {
  const prompt = TECH_STACK_PROMPT.replace(
    /{(\w+)}/g,
    (_, key) => projectDetails[key] || ""
  );
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
  });
  let content = response.choices[0].message?.content || "{}";
  content = content.replace(/```json|```/g, "").trim();

  return JSON.parse(content);
}

export async function generateTimeline(projectDetails: any) {
  const prompt = TIMELINE_PROMPT.replace(
    /{(\w+)}/g,
    (_, key) => projectDetails[key] || ""
  );
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
  });
  let content = response.choices[0].message?.content || "{}";
  content = content.replace(/```json|```/g, "").trim();

  return JSON.parse(content);
}

export async function generateArchitecture(projectDetails: any) {
  const prompt = ARCHITECTURE_PROMPT.replace(
    /{(\w+)}/g,
    (_, key) => projectDetails[key] || ""
  );
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
  });
  let content = response.choices[0].message?.content || "{}";
  content = content.replace(/```json|```/g, "").trim();

  return JSON.parse(content);
}

// export async function generateTechStack(projectDetails: any) {
//   const prompt = TECH_STACK_PROMPT.replace(
//     /{(\w+)}/g,
//     (_, key) => projectDetails[key] || ""
//   );
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{ role: "system", content: prompt }],
//     temperature: 0.7,
//   });
//   let content = response.choices[0].message?.content || "{}";
//   content = content.replace(/```json|```/g, "").trim();

//   return JSON.parse(content);
// }

// export async function generateTimeline(projectDetails: any) {
//   const prompt = TIMELINE_PROMPT.replace(
//     /{(\w+)}/g,
//     (_, key) => projectDetails[key] || ""
//   );
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{ role: "system", content: prompt }],
//     temperature: 0.7,
//   });
//   let content = response.choices[0].message?.content || "{}";
//   content = content.replace(/```json|```/g, "").trim();

//   return JSON.parse(content);
// }

// export async function generateArchitecture(projectDetails: any) {
//   const prompt = ARCHITECTURE_PROMPT.replace(
//     /{(\w+)}/g,
//     (_, key) => projectDetails[key] || ""
//   );
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{ role: "system", content: prompt }],
//     temperature: 0.7,
//   });
//   let content = response.choices[0].message?.content || "{}";
//   content = content.replace(/```json|```/g, "").trim();

//   return JSON.parse(content);
// }
