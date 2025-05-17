import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useProjectStore } from "../lib/store";
// import { analyzeProject } from "../lib/api";

export function ProjectInput() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    setProjectDescription,
    setRoadmap,
    setArchitecture,
    setTimeline,
    setTechStack,
  } = useProjectStore();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isLoading) return;

  //   try {
  //     setIsLoading(true);
  //     setProjectDescription(description);

  //     // Call the single API endpoint
  //     const response = await fetch("http://localhost:8000/api/project", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         projectName,
  //         description,
  //         requirements,
  //         industry,
  //         budget,
  //       }),
  //     });

  //     if (!response.ok) {
  //       console.log("logging error :", response);
  //       throw new Error("Failed to create project");
  //     }

  //     const result = await response.json();

  //     // Update the store with the response data
  //     setRoadmap(result.project.roadmap);
  //     setArchitecture(result.project.architecture);
  //     setTimeline(result.project.timeline);
  //     setTechStack(result.project.techStack);

  //     // Clear the form fields
  //     setProjectName("");
  //     setDescription("");
  //     setRequirements("");
  //     setIndustry("");
  //     setBudget("");
  //   } catch (error) {
  //     console.error("Error generating project plan:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      setProjectDescription(description);

      // Call the Python API for tech stack recommendation
      const techStackResponse = await fetch(
        "http://localhost:8080/api/tech-stack",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectName,
            description,
            requirements,
            industry,
            budget,
          }),
        }
      );

      if (!techStackResponse.ok) {
        throw new Error("Failed to fetch tech stack");
      }

      const techStackData = await techStackResponse.json();
      setTechStack(techStackData.techStack);

      // Call the existing API for other recommendations (roadmap, timeline, etc.)
      const response = await fetch("http://localhost:8000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          description,
          requirements,
          industry,
          budget,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const result = await response.json();

      // Update the store with the response data
      setRoadmap(result.project.roadmap);
      setArchitecture(result.project.architecture);
      setTimeline(result.project.timeline);

      // Clear the form fields
      setProjectName("");
      setDescription("");
      setRequirements("");
      setIndustry("");
      setBudget("");
    } catch (error) {
      console.error("Error generating project plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project idea in detail..."
          className="w-full min-h-[150px] p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          disabled={isLoading}
        />
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="List your project requirements..."
          className="w-full min-h-[100px] p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          disabled={isLoading}
        />
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry"
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget"
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            "Generate Plan"
          )}
        </button>
      </div>
    </form>
  );
}
