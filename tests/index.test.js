const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const TEST_PROJECT_NAME = 'test-project';
const TEST_PROJECT_PATH = path.join(process.cwd(), TEST_PROJECT_NAME);
const CLI_PATH = path.join(process.cwd(), 'bin/fastify-create.js');

// Clean up test project directory before and after tests
async function cleanup() {
    if (fs.existsSync(TEST_PROJECT_PATH)) {
        fs.rmSync(TEST_PROJECT_PATH, { recursive: true, force: true });
    }
}

test('CLI creates a new project from template', async () => {
    try {
        await cleanup();

        // Make CLI script executable
        await execAsync(`chmod +x ${CLI_PATH}`);

        // Execute the CLI command
        const { stdout } = await execAsync(`node ${CLI_PATH} ${TEST_PROJECT_NAME}`);
        console.log(stdout); // Log CLI output for debugging

        // Verify project was created successfully
        assert.ok(
            fs.existsSync(TEST_PROJECT_PATH),
            'Project directory should be created'
        );

        // Verify essential files exist
        const essentialFiles = [
            'package.json',
            'api/server.ts',
            'api/routes.ts',
            'api/generateOpenApi.ts',
            'types/ErrorResponse.ts',
            'types/ExampleRequest.ts',
            'types/ExampleResponse.ts',
            'tsconfig.json',
            'README.md'
        ];

        essentialFiles.forEach(file => {
            const filePath = path.join(TEST_PROJECT_PATH, file);
            assert.ok(
                fs.existsSync(filePath),
                `Essential file ${file} should exist`
            );
        });

        // Verify node_modules and .git are not copied
        assert.ok(
            !fs.existsSync(path.join(TEST_PROJECT_PATH, 'node_modules')),
            'node_modules should not be copied'
        );
        assert.ok(
            !fs.existsSync(path.join(TEST_PROJECT_PATH, '.git')),
            '.git should not be copied'
        );

        // Verify package.json content
        const packageJson = require(path.join(TEST_PROJECT_PATH, 'package.json'));
        assert.ok(packageJson.name, 'package.json should have a name field');
        assert.ok(packageJson.version, 'package.json should have a version field');
        assert.ok(packageJson.scripts, 'package.json should have scripts');
        assert.ok(packageJson.scripts.dev, 'package.json should have dev script');

    } catch (error) {
        console.error('Test error:', error);
        throw error;
    } finally {
        await cleanup();
    }
});

test('CLI handles existing directory error', async () => {
    try {
        // Create the test directory
        fs.mkdirSync(TEST_PROJECT_PATH);

        // Try to create project in existing directory
        try {
            await execAsync(`node ${CLI_PATH} ${TEST_PROJECT_NAME}`);
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert.ok(
                error.stderr.includes('already exists'),
                'Should show directory exists error'
            );
        }
    } finally {
        await cleanup();
    }
});

test('CLI requires project name', async () => {
    try {
        await execAsync(`node ${CLI_PATH}`);
        assert.fail('Should have thrown an error');
    } catch (error) {
        assert.ok(
            error.stderr.includes('Please specify a project name'),
            'Should show project name required error'
        );
    }
});