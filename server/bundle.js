const { build } = require("esbuild");
const nodemon = require("nodemon");

// Function to build the project
const buildProject = async () => {
    console.log("Building...");
    try {
        await build({
            platform: "node",
            bundle: true,
            entryPoints: ["src/index.ts"],
            outdir: "build",
        });
        console.log("Build completed successfully.");
    } catch (error) {
        console.error("Build failed:", error);
    }
};

// Trigger the initial build
buildProject();

// Watch for file changes and trigger the build
nodemon({
    script:"build/index.js",
    ext: "json,ts", // Specify the file extensions to watch
    watch: ["./src"], // Specify the directories to watch for changes
}).on("restart", buildProject);