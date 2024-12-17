import { promises as fsPromises } from 'fs';
import * as path from 'path';

// Type definitions
interface TemplateStructure {
  [category: string]: string[] | { [subCategory: string]: string[] };
}

class TemplateGenerator {
  private runtime: 'bun' | 'node';

  constructor() {
    this.runtime = this.detectRuntime();
  }

  // Detect current runtime
  private detectRuntime(): 'bun' | 'node' {
    if (typeof Bun !== 'undefined') {
      return 'bun';
    }
    return 'node';
  }

  // Read input based on runtime
  async getInput(prompt: string): Promise<string> {
    process.stdout.write(prompt);

    if (this.runtime === 'bun') {
      return this.bunInput();
    }
    
    return this.nodeInput();
  }

  // Bun-specific input method
  private bunInput(): Promise<string> {
    return new Promise((resolve) => {
      // Use Bun's readableStream
      const reader = Bun.stdin.stream().getReader();
      
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve('');
          return;
        }
        
        // Convert the Uint8Array to a string and trim
        const input = new TextDecoder().decode(value).trim();
        resolve(input);
      });
    });
  }

  // Node.js-specific input method
  private nodeInput(): Promise<string> {
    return new Promise((resolve) => {
      process.stdin.once('data', (data) => {
        resolve(data.toString().trim());
      });
      process.stdin.resume();
    });
  }

  // Check if path exists
  private async pathExists(path: string): Promise<boolean> {
    try {
      await fsPromises.access(path);
      return true;
    } catch {
      return false;
    }
  }

  // Load template structure from JSON
  async loadTemplateStructure(jsonPath: string): Promise<TemplateStructure> {
    try {
      const fileContent = await fsPromises.readFile(jsonPath, 'utf-8');
      return JSON.parse(fileContent) as TemplateStructure;
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      throw error;
    }
  }

  // Create folder structure
  async createStructure(rootFolder: string, structure: TemplateStructure) {
    try {
      // Ensure root folder exists
      if (!(await this.pathExists(rootFolder))) {
        await fsPromises.mkdir(rootFolder, { recursive: true });
        console.log(`Created root folder: ${rootFolder}`);
      }

      // Create subfolders and files
      for (const [folder, content] of Object.entries(structure)) {
        const folderPath = path.join(rootFolder, folder);

        // Handle nested structure
        if (typeof content === 'object') {
          if (Array.isArray(content)) {
            // Simple array of files
            await this.createFolderWithFiles(folderPath, content);
          } else {
            // Nested object structure
            await this.createNestedStructure(folderPath, content);
          }
        }
      }

      console.log("✅ Folder structure successfully created!");
    } catch (error) {
      console.error("❌ Error creating folder structure:", error);
      process.exit(1);
    }
  }

  // Create a folder and its files
  private async createFolderWithFiles(folderPath: string, files: string[]) {
    // Create folder if it doesn't exist
    if (!(await this.pathExists(folderPath))) {
      await fsPromises.mkdir(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    }

    // Create files
    for (const file of files) {
      const filePath = path.join(folderPath, file);

      if (!(await this.pathExists(filePath))) {
        await fsPromises.writeFile(filePath, `// ${file} content placeholder`);
        console.log(`Created file: ${filePath}`);
      } else {
        console.log(`File already exists: ${filePath}`);
      }
    }
  }

  // Handle nested folder structures
  private async createNestedStructure(basePath: string, subStructure: { [subCategory: string]: string[] }) {
    // Ensure base path exists
    if (!(await this.pathExists(basePath))) {
      await fsPromises.mkdir(basePath, { recursive: true });
      console.log(`Created base folder: ${basePath}`);
    }

    // Create subfolders and their files
    for (const [subFolder, files] of Object.entries(subStructure)) {
      const subFolderPath = path.join(basePath, subFolder);
      await this.createFolderWithFiles(subFolderPath, files);
    }
  }

  // Main execution method
  async generate(jsonPath: string) {
    try {
      // Load template structure from JSON
      const structure = await this.loadTemplateStructure(jsonPath);

      // Get root folder input
      const rootFolder = await this.getInput(
        "Enter the root folder for your templates: "
      );

      if (!rootFolder) {
        console.log("❌ Root folder cannot be empty. Exiting.");
        process.exit(1);
      }

      // Create structure
      await this.createStructure(rootFolder, structure);
    } catch (error) {
      console.error("❌ Generation failed:", error);
      process.exit(1);
    }
  }
}

// Example usage
async function main() {
  const generator = new TemplateGenerator();
  await generator.generate('./template-structure.json');
}

main();