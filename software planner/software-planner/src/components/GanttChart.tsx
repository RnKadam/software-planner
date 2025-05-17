import { cn } from "../lib/utils";

interface Milestone {
  name: string;
  duration: string;
  status?: "completed" | "in-progress" | "delayed";
}

interface GanttChartProps {
  milestones: Milestone[];
}

export function GanttChart({ milestones }: GanttChartProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-yellow-500";
      case "delayed":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div key={index} className="relative">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "h-4 w-4 rounded-full",
                getStatusColor(milestone.status)
              )}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-white">{milestone.name}</h4>
                <span className="text-sm text-gray-300">
                  {milestone.duration}
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    getStatusColor(milestone.status)
                  )}
                  style={{
                    width:
                      milestone.status === "completed"
                        ? "100%"
                        : milestone.status === "in-progress"
                        ? "50%"
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>
          {index < milestones.length - 1 && (
            <div className="absolute left-2 top-4 bottom-0 w-[1px] bg-gray-700" />
          )}
        </div>
      ))}
    </div>
  );
}
