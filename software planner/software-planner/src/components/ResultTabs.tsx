import * as Tabs from "@radix-ui/react-tabs";
import { useProjectStore } from "../lib/store";
import { cn } from "../lib/utils";
import { LayoutIcon, BoxesIcon, ClockIcon, WrenchIcon } from "lucide-react";
import { GanttChart } from "./GanttChart";
import { useState } from "react";

export function ResultTabs() {
  const { roadmap, architecture, timeline, techStack } = useProjectStore();
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  console.log("roadmap : ", roadmap);

  const tabs = [
    { id: "roadmap", label: "Roadmap", icon: LayoutIcon },
    { id: "architecture", label: "Architecture", icon: BoxesIcon },
    { id: "timeline", label: "Timeline", icon: ClockIcon },
    { id: "techstack", label: "Tech Stack", icon: WrenchIcon },
  ];

  return (
    <Tabs.Root className="w-full max-w-3xl mx-auto" defaultValue="roadmap">
      <Tabs.List className="flex border-b border-gray-700 mb-6">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Tabs.Trigger
            key={id}
            value={id}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-400",
              "border-b-2 border-transparent hover:text-gray-200 hover:border-gray-600",
              "data-[state=active]:text-blue-400 data-[state=active]:border-blue-400"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <Tabs.Content value="roadmap" className="p-6">
          {roadmap && roadmap.milestones ? (
            <div className="space-y-6">
              {roadmap.milestones.map((phase, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-l-4 border-blue-500 pl-4 cursor-pointer transition-colors",
                    selectedPhase === phase.phase && "bg-gray-700 rounded-r"
                  )}
                  onClick={() => setSelectedPhase(phase.phase)}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {phase.phase} ({phase.timeline})
                  </h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="text-gray-300 flex items-start space-x-2"
                      >
                        <span className="mt-1.5">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Enter your project description to generate a detailed roadmap.
            </p>
          )}
        </Tabs.Content>

        <Tabs.Content value="architecture" className="p-6">
          {architecture ? (
            <div className="space-y-4">
              {architecture.components.map((component: any, index: number) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 uppercase mb-2">
                    {component.name}
                  </h3>
                  <p className="text-white">{component.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Enter your project details to generate architecture.
            </p>
          )}
        </Tabs.Content>

        <Tabs.Content value="timeline" className="p-6">
          {timeline ? (
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300 mb-1">
                  Estimated Duration
                </h3>
                <p className="text-blue-400 text-lg font-semibold">
                  {timeline.totalDuration}
                </p>
              </div>
              {/* <GanttChart milestones={timeline.milestones} /> */}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Enter project scope to generate timeline.
            </p>
          )}
        </Tabs.Content>
        <Tabs.Content value="techstack" className="p-6">
          {techStack ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <span className="text-white font-medium">{techStack}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Enter your project requirements to get tech stack recommendations.
            </p>
          )}
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
