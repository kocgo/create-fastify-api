#!/usr/bin/env node

const download = require('download-git-repo');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
    console.error('Please specify a project name:');
    console.error('  npx fastify-create project-name');
    process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
}

console.log(`Creating a new Fastify app in ${projectPath}...`);

// Using download-git-repo instead of git commands
download('kocgo/fastify-template', projectPath, { clone: false }, function (err) {
    if (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }

    console.log('\nSuccess! Your Fastify app is ready.');
    console.log('\nInside that directory, you can run several commands:');
    console.log('\n  npm install');
    console.log('    Install the dependencies');
    console.log('\n  npm run dev');
    console.log('    Starts the development server');
    console.log('\nHappy coding! 🚀');
});