import { Code2, Boxes, Clock, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">
          Transform Your Ideas into Actionable Plans
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Describe your project idea in simple terms, and let our AI generate a
          comprehensive development plan, architecture, timeline, and tech stack
          recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: Code2,
            title: "Project Roadmap",
            description: "Get a detailed development roadmap",
          },
          {
            icon: Boxes,
            title: "Architecture",
            description: "Receive system architecture recommendations",
          },
          {
            icon: Clock,
            title: "Timeline",
            description: "View project timeline estimates",
          },
          {
            icon: Sparkles,
            title: "Tech Stack",
            description: "Get technology recommendations",
          },
        ].map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <Icon className="h-8 w-8 text-blue-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
