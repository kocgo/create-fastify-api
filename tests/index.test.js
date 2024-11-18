// single test
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const TEST_PROJECT_NAME = 'test-project';
const TEST_PROJECT_PATH = path.join(process.cwd(), TEST_PROJECT_NAME);
const CLI_PATH = path.join(process.cwd(), 'bin/create-fastify-api.js');

// Clean up test project directory before and after tests
async function cleanup() {
    if (fs.existsSync(TEST_PROJECT_PATH)) {
        fs.rmSync(TEST_PROJECT_PATH, { recursive: true, force: true });
    }
}

test('CLI command', async () => {
    try {
        await cleanup();

        // Make CLI script executable
        await execAsync(`chmod +x ${CLI_PATH}`);

        // Execute the CLI command using the local script
        const { stdout } = await execAsync(`npx create-fastify-api ${TEST_PROJECT_NAME}`);
        console.log(stdout); // Log CLI output for debugging

        // Verify project was created successfully
        assert.ok(
            fs.existsSync(TEST_PROJECT_PATH),
            'Project directory should be created'
        );

        // Verify essential files exist
        const essentialFiles = [
            'package.json',
            'tsconfig.json',
            'api/routes.ts',
            'api/server.ts',
            'types/ExampleRequest.ts',
            'types/ExampleResponse.ts'
        ];

        essentialFiles.forEach(file => {
            assert.ok(
                fs.existsSync(path.join(TEST_PROJECT_PATH, file)),
                `${file} should exist`
            );
        });

        // Verify git was initialized
        assert.ok(
            fs.existsSync(path.join(TEST_PROJECT_PATH, '.git')),
            'Git repository should be initialized'
        );

        // Verify dependencies were installed
        assert.ok(
            fs.existsSync(path.join(TEST_PROJECT_PATH, 'node_modules')),
            'Dependencies should be installed'
        );

    } finally {
        await cleanup();
    }
});