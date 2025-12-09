const { program } = require("commander");
const pkg = require("./package.json");
const create = require("./lib/create");
const path = require('path');

program.name("mipyao-cli").description("mipyao cli工具").version(pkg.version);

// 定义 create 命令
program
  .command("create <project-name>")
  .description("Create a new project from a template.")
  .action((projectName) => {
    // 调用 lib/create.js 中的核心逻辑
    create(projectName, path.resolve(projectName));
  });

// 如果未来还有其他命令（如 my-cli upgrade, my-cli config）
// program
//   .command('upgrade')
//   .description('Upgrade the current project dependencies...')
//   .action(() => {
//      // ... 调用 lib/upgrade.js
//   });

program.parse(process.argv);
