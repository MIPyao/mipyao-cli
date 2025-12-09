const {execa} = require('execa');
const pc = require('picocolors');
const path = require('path');
const inquirerModule = require('inquirer');
const oraModule = require('ora');
const ora = oraModule.default || oraModule;
const inquirer = inquirerModule.default || inquirerModule;



// 你的 GitHub 模板仓库地址
const REPO_MAP = {
  VUE: 'https://github.com/MIPyao/Vue-empty.git',
  REACT: 'https://github.com/MIPyao/react-empty.git',
};

// 预定义的分支选项
const BRANCH_CHOICES = [
    { name: pc.yellow('Vue3+TS (推荐)'), value: 'Vue3TS', repoKey: 'VUE' },
    { name: pc.cyan('Vue3+JS'), value: 'Vue3', repoKey: 'VUE' },
    { name: pc.blue('Vue2模板'), value: 'master', repoKey: 'VUE' },
    { name: pc.green('React19+Vite(推荐)'), value: 'vite', repoKey: 'REACT' },
    { name: pc.magenta('ReactCRA'), value: 'master', repoKey: 'REACT' },
];

/**
 * create 命令的核心执行函数
 * @param {string} projectName 用户输入的项目名称
 * @param {string} targetDir 项目将被创建的绝对路径
 */
module.exports = async function (projectName, targetDir) {
  const spinner = ora();
  
  // 使用 pc.green() 来为项目名着色
  console.log(`\n 准备创建项目: ${pc.green(projectName)}`);

  try {
    // --- 1. 交互式选择分支 ---
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'branchInfo',
        message: '请选择你想要创建的项目模板分支:',
        choices: BRANCH_CHOICES,
      },
    ]);
    const selectedValue = answers.branchInfo;
    const selectedChoice = BRANCH_CHOICES.find(choice => choice.value === selectedValue);
    if (!selectedChoice) throw new Error('未能识别的选择项');
    
    const branchName = selectedChoice.value;
    const repoUrl = REPO_MAP[selectedChoice.repoKey];

    // --- 2. 执行 Git Clone ---
    // 使用 pc.yellow() 和 pc.cyan() 来为提示信息着色
    spinner.start(`克隆分支 ${pc.yellow(branchName)} 到 ${pc.cyan(targetDir)}...`);

    // 克隆指定分支到目标目录
    await execa('git', ['clone', '-b', branchName, '--single-branch', repoUrl, targetDir]);

    // 使用 pc.green() 和 pc.bold() 来着色成功信息
    spinner.succeed(pc.bold(pc.green('项目模板克隆成功!')));
    
    // --- 3. 善后处理 (移除 .git 并初始化新仓库) ---
    spinner.text = '初始化本地仓库...';
    
    // 移除 .git 文件夹
    const gitDir = path.join(targetDir, '.git');
    await execa('cmd', ['/c', 'rmdir', '/s', '/q', gitDir], { cwd: targetDir })
    
    // 在新目录中初始化新的 Git 仓库
    await execa('git', ['init'], { cwd: targetDir }); 
    
    spinner.succeed(pc.bold(pc.green('模板完成并初始化git')));
    
    // 提示下一步
    console.log(`\n🎉 Done! To start working, run:`);
    console.log(pc.cyan(`   cd ${projectName}`));
    console.log(pc.cyan(`   pnpm install`));
    console.log(pc.cyan(`   pnpm run dev`));

  } catch (error) {
    if (spinner.isSpinning) {
      spinner.fail();
    }
    // 使用 pc.red() 和 pc.bold() 来着色错误提示
    console.error(pc.bold(pc.red('\n Failed to create project:')));
    console.error(error.message || error);
  }
};