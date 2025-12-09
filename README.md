# mipyao-cli

mipyao-cli 是一个交互式脚手架，通过预置的 Git 模板仓库快速创建 Vue/React 项目。

## 安装

- 全局安装（推荐）：
  - `npm install -g @mipyao/mipyao-cli`
  - 或 `pnpm add -g @mipyao/mipyao-cli`
- 本地开发调试：
  - 在仓库根目录执行 `pnpm install`
  - 直接使用 `node cli.js create <project-name>` 体验命令

## 使用

```bash
mipyao-cli create my-app
```

命令会引导你选择模板分支并自动完成：
1. 从对应仓库指定分支克隆代码到目标目录
2. 清理原仓库的 `.git` 目录并重新初始化 Git
3. 提示进入目录后执行 `pnpm install`、`pnpm run dev`

## 可选模板

- Vue3 + TS（推荐）：`Vue-empty` 仓库的 `Vue3TS` 分支
- Vue3 + JS：`Vue-empty` 仓库的 `Vue3` 分支
- Vue2 模板：`Vue-empty` 仓库的 `master` 分支
- React19 + Vite（推荐）：`react-empty` 仓库的 `vite` 分支
- React CRA：`react-empty` 仓库的 `master` 分支

## 环境要求

- Node.js 18+ 建议
- 已安装 Git（用于克隆模板）
- 推荐全局安装 `pnpm`

## 开发与贡献

1. 克隆本仓库并安装依赖：`pnpm install`
2. 在本地以未发布形式运行：`node cli.js create demo-app`
3. 提交 PR 前请确保代码能在本地正常执行

---
遇到问题或有新模板需求，欢迎提交 Issue/PR。

