export const TECH_STACK_PROMPT = `
You are an expert software architect. Based on the following project details, suggest the best tech stack:
- Project Name: {projectName}
- Description: {description}
- Requirements: {requirements}
- Industry: {industry}
- Budget: {budget}

Provide a detailed tech stack recommendation with:
1. Frontend: Framework, libraries, and tools
2. Backend: Language, framework, and server
3. Database: Type and specific database
4. DevOps: CI/CD tools, cloud providers
5. Additional Tools: Testing, monitoring, etc.

Format the response as JSON:
{
  "frontend": { "framework": "", "libraries": [], "tools": [] },
  "backend": { "language": "", "framework": "", "server": "" },
  "database": { "type": "", "name": "" },
  "devops": { "ci_cd": "", "cloud": "" },
  "additional_tools": { "testing": [], "monitoring": [] }
}
`;

export const ROADMAP_PROMPT = `
You are an expert software project planner. Based on the following project details, generate a detailed development roadmap:
- Project Name: {projectName}
- Description: {description}
- Requirements: {requirements}
- Industry: {industry}
- Budget: {budget}

Provide a step-by-step roadmap with:
1. Key milestones
2. Estimated timeline (weeks/months)
3. Best practices for each phase

Format the response as JSON:
{
  "milestones": [
    { "phase": "", "tasks": [], "timeline": "", "best_practices": "" }
  ]
}
`;

export const TIMELINE_PROMPT = `
You are an expert project manager. Based on the following project details, generate a detailed timeline:
- Project Name: {projectName}
- Description: {description}
- Requirements: {requirements}
- Industry: {industry}
- Budget: {budget}

Provide a timeline with:
1. Phases (e.g., Design, Development, Testing, Deployment)
2. Start and end dates for each phase
3. Dependencies between phases

Format the response as JSON:
{
  "timeline": [
    { "phase": "", "start_date": "", "end_date": "", "dependencies": [] }
  ]
}
`;

export const ARCHITECTURE_PROMPT = `
You are an expert system architect. Based on the following project details, generate a detailed system architecture:
- Project Name: {projectName}
- Description: {description}
- Requirements: {requirements}
- Industry: {industry}
- Budget: {budget}

Provide a system architecture with:
1. Components (e.g., Frontend, Backend, Database, APIs)
2. Communication flow between components
3. Technology choices for each component

Format the response as JSON:
{
  "components": [
    { "name": "", "technology": "", "description": "" }
  ],
  "communication_flow": [
    { "from": "", "to": "", "protocol": "" }
  ]
}
`;
