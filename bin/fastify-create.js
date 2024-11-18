#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
    console.error('Please specify a project name:');
    console.error('  npx fastify-create project-name');
    process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, '..', 'template');

if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
}

console.log(`Creating a new Fastify app in ${projectPath}...`);

try {
    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });

    // Function to copy directory recursively
    function copyDir(src, dest) {
        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            // Skip node_modules and .git directories
            if (srcPath.includes('node_modules') || srcPath.includes('.git')) {
                continue;
            }

            if (entry.isDirectory()) {
                fs.mkdirSync(destPath, { recursive: true });
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    // Copy template to project directory
    copyDir(templatePath, projectPath);

    console.log('\nSuccess! Your Fastify app is ready.');
    console.log('\nInside that directory, you can run several commands:');
    console.log('\n  npm install');
    console.log('    Install the dependencies');
    console.log('\n  npm run dev');
    console.log('    Starts the development server');
    console.log('\nHappy coding! 🚀');
} catch (err) {
    console.error('Error:', err.message);
    // Clean up if there's an error
    if (fs.existsSync(projectPath)) {
        fs.rmSync(projectPath, { recursive: true, force: true });
    }
    process.exit(1);
}