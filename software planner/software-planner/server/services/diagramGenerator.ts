import fs from "fs-extra";
import { exec } from "child_process";
import path from "path";

/**
 * Generates Mermaid.js diagram syntax from architecture components.
 * @param components - Array of system components with dependencies.
 * @returns Mermaid.js syntax string.
 */
export function generateDiagram(
  components: { name: string; dependencies: string[] }[]
): string {
  return `
    graph TD;
    ${components
      .map(({ name, dependencies }) =>
        dependencies.map((dep) => `${name} --> ${dep}`).join("\n")
      )
      .join("\n")}
  `;
}

/**
 * Saves the Mermaid.js diagram as an image file.
 * @param mermaidCode - The Mermaid.js diagram syntax.
 * @param outputFilePath - Path to save the generated diagram.
 * @returns Promise that resolves to the file path.
 */
export function saveMermaidDiagram(
  mermaidCode: string,
  outputFilePath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(__dirname, "temp.mmd");

    // Save Mermaid code to a temporary file
    fs.writeFile(tempFilePath, mermaidCode, (err) => {
      if (err) return reject(err);

      // Generate the diagram using Mermaid CLI
      exec(`mmdc -i ${tempFilePath} -o ${outputFilePath}`, (error) => {
        fs.remove(tempFilePath); // Cleanup temp file

        if (error) {
          console.error("Mermaid diagram generation failed:", error);
          return reject(error);
        }

        console.log("Diagram saved at:", outputFilePath);
        resolve(outputFilePath);
      });
    });
  });
}
