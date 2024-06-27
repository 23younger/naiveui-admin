## 🏗️ 使用

- 安装依赖

```bash

pnpm install

```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm build
```

## 路由配置
- 配置keepAlive路由组件：路由配置里组件名name首字母大写驼峰法，meta设置keepAlive为true，vue文件setup后写对应组件名
- 组件 name 设置为url，点击菜单项将会以外链形式新开页面打开
- 想设置菜单样式 文字后添加icon，可设置 meta.extra: renderNew()

## 📋 Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 🌐 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE
