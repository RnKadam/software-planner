const API_BASE_URL = "http://localhost:8000/api";

export async function analyzeProject(projectDetails: {
  projectName: string;
  description: string;
  requirements: string;
  industry: string;
  budget: string;
}) {
  try {
    const [techStackRes, roadmapRes, timelineRes, architectureRes] = await Promise.all([
      fetch(`${API_BASE_URL}/tech-stack`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectDetails),
      }),
      fetch(`${API_BASE_URL}/roadmap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectDetails),
      }),
      fetch(`${API_BASE_URL}/timeline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectDetails),
      }),
      fetch(`${API_BASE_URL}/architecture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectDetails),
      }),
    ]);

    // Handle errors for the commented-out APIs
    if (!techStackRes.ok || !roadmapRes.ok || !timelineRes.ok || !architectureRes.ok) {
      throw new Error('Failed to fetch project data');
    }

    // Parse responses for the commented-out APIs
    const [techStack, roadmap, timeline, architecture] = await Promise.all([
      techStackRes.json(),
      roadmapRes.json(),
      timelineRes.json(),
      architectureRes.json(),
    ]);

    // Return only the roadmap data
    return { roadmap, techStack, timeline, architecture };
  } catch (error) {
    console.error("Error analyzing project:", error);
    throw error;
  }
}
