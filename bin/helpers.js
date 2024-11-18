const chalk = require('chalk');
const download = require('download-git-repo');
const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);
const downloadAsync = promisify(download);

const log = {
    info: (msg) => console.log(chalk.blue(msg)),
    success: (msg) => console.log(chalk.green(msg)),
    error: (msg) => console.log(chalk.red(msg)),
    warning: (msg) => console.log(chalk.yellow(msg)),
};

async function downloadTemplate(projectName) {
    log.info('Downloading template...');
    try {
        await downloadAsync(
            'direct:https://github.com/kocgo/fastify-template.git',
            projectName,
            { clone: true }
        );
        log.success('Template downloaded successfully');
    } catch (error) {
        log.error('Failed to download template');
        throw error;
    }
}

async function installDependencies(projectPath, packageManager = 'npm') {
    log.info('Installing dependencies...');
    try {
        await execAsync(`cd ${projectPath} && ${packageManager} install`);
        log.success('Dependencies installed successfully');
    } catch (error) {
        log.error('Failed to install dependencies');
        throw error;
    }
}

async function initGit(projectPath) {
    log.info('Initializing git repository...');
    try {
        await execAsync(`cd ${projectPath} && git init`);
        log.success('Git repository initialized');
    } catch (error) {
        log.error('Failed to initialize git repository');
        throw error;
    }
}

module.exports = {
    log,
    downloadTemplate,
    installDependencies,
    initGit,
};