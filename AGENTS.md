# AGENTS.md

## 项目概况
- **类型**: Vue 3 单页应用 (Vite + TypeScript)
- **功能**: 健康日记应用（天气查询、AI健康分析、饮食/睡眠/护肤记录）
- **包管理**: pnpm

## 开发命令

```bash
pnpm dev              # 启动开发服务器 (端口 8088, host 0.0.0.0)
pnpm build-dev        # 开发环境构建
pnpm build-prd       # 生产环境构建
pnpm type-check      # vue-tsc 类型检查
pnpm lint --fix      # ESLint 检查并修复
pnpm format         # Prettier 格式化 src/
pnpm push-gh-pages  # 构建后部署到 GitHub Pages (git subtree)
```

## 构建产物
- 开发/生产构建输出: `dist/`
- SSR 构建: `dist-ssr/`
- **注意**: `.gitignore` 忽略了 `dist`，但实际部署用 `dist`

## 环境变量

| 文件 | 用途 |
|------|------|
| `.env` | 基础配置（VITE_CURRENT_VITE_URL=www.pnfeather.xyz） |
| `.env.development` | 开发环境（VITE_BASE_URL=/, VITE_AI_BASE_URL=/custom/ai） |
| `.env.production` | 生产环境（VITE_BASE_URL=/github-online/） |

**关键逻辑**: Vite proxy 将 `/custom/ai` 请求转发到 `VITE_CURRENT_VITE_URL`

## 代码风格
- **缩进**: 2 spaces
- **Prettier**: semi:false, singleQuote:true, printWidth:100
- **ESLint**: flat config + @vue/eslint-config-typescript + eslint-plugin-vue
- **CSS**: Less with postcss-pxtorem (rootValue: 37.5px → rem), `.van-*` 类名排除转换

## 依赖特点
- **Vant**: 自动导入组件（unplugin-vue-components），但 `Toast`、`Confirm` 等组件样式需单独引入 `vant/lib/index.css`
- **amfe-flexible**: 移动端适配（viewport meta 被覆盖）
- **html2canvas**: 用于生成健康日记截图

## 架构注意
- **路由**: Hash 模式 `createWebHashHistory`，基于 `VITE_BASE_URL`
- **状态**: Pinia store (`src/stores/`)
- **入口**: `src/main.ts` 挂载 Toast 插件和 Pinia
- **localStorage**: 健康日记数据以 `QIU_DAN_APP_DATA_*` 前缀持久化

## API 端点
- 天气: `${BASE_URL}/api/weather?cityId=xxx`
- AI 分析: `${BASE_URL}/api/ai` (POST)
- 地理编码: `${BASE_URL}/api/regeo?longitude=&latitude=`
- 后端部署在 Vercel (health-diary-api)

## 部署
```bash
pnpm build-prd && git subtree push --prefix dist origin gh-pages
```
访问: https://pnfeather.github.io/github-online/#/

## 已知问题
- `AboutView.vue` 在 `src/views/AboutView/` 不存在，但 router 中未使用（忽略即可）
