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
const templatePath = path.resolve(__dirname, '..', 'template');

// Debug log to see the resolved paths
console.log('Debug - Template path:', templatePath);
console.log('Debug - Project path:', projectPath);
console.log('Debug - Template exists:', fs.existsSync(templatePath));
console.log('Debug - Template contents:', fs.readdirSync(templatePath));

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
        console.log('Debug - Copying from:', src, 'to:', dest);
        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            // Skip node_modules and .git directories
            if (entry.name === 'node_modules' || entry.name === '.git') {
                console.log('Debug - Skipping:', entry.name);
                continue;
            }

            if (entry.isDirectory()) {
                fs.mkdirSync(destPath, { recursive: true });
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
                console.log('Debug - Copied file:', entry.name);
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
    console.error('Error stack:', err.stack);
    // Clean up if there's an error
    if (fs.existsSync(projectPath)) {
        fs.rmSync(projectPath, { recursive: true, force: true });
    }
    process.exit(1);
}