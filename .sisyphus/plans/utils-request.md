# 全局 UTILS 和公共请求封装

## TL;DR

> **Quick Summary**: 创建 `window.UTILS` 全局对象，包含 BASE_URL 和封装好的 request 方法，替换项目中所有 axios/fetch 调用。
>
> **Deliverables**:
> - `src/utils/global.ts` - UTILS 全局对象定义
> - `src/views/HealthDiary/HealthDiary.vue` - 替换所有 HTTP 调用
>
> **Estimated Effort**: Small
> **Parallel Execution**: NO - sequential (one task builds on another)
> **Critical Path**: Task 1 → Task 2 → Task 3

---

## Context

### Original Request
定义一个全局变量 UTILS,挂载到 window 对象上面,并将 BASE_RUL 挂载到 UTILS 的属性下面,并封装一个公共请求接口方法,替换项目中用到的请求.

### Interview Summary
**Key Discussions**:
- 请求封装范围: 完整封装（自动错误 Toast、loading 状态、统一错误处理）
- AI 接口处理: 统一改为 axios
- BASE_URL 来源: 使用 `VITE_AI_BASE_URL || VITE_CURRENT_VITE_URL` (现有逻辑)

---

## Work Objectives

### Core Objective
创建统一的请求工具模块，暴露到 window.UTILS，并替换 HealthDiary.vue 中的所有 HTTP 调用。

### Concrete Deliverables
- `src/utils/global.ts` - 全局 UTILS 对象
- 修改 `src/views/HealthDiary/HealthDiary.vue` - 使用 UTILS.request 替换所有请求

### Definition of Done
- [x] `window.UTILS` 在浏览器控制台可访问
- [x] `window.UTILS.BASE_URL` 返回正确的 base URL
- [x] `window.UTILS.request.get/post` 方法可用
- [x] HealthDiary.vue 中不存在 `axios.get/post` 和 `fetch(` 调用
- [x] 天气查询、地理定位、AI 分析三个功能手动测试正常

### Must Have
- 完整的请求封装（自动 Toast 错误提示、loading 状态管理）
- TypeScript 类型支持
- 保留原有请求的所有功能

### Must NOT Have (Guardrails)
- 不创建 `src/api/` 目录（保持简单，不拆分模块）
- 不添加 axios 拦截器配置
- 不实现请求缓存
- 不修改 localStorage 相关逻辑
- 不修改其他 view 文件

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: N/A
- **Agent-Executed QA**: MANDATORY for all tasks

### QA Policy
每个 task 必须包含 agent-executed QA scenarios。

---

## Execution Strategy

### Task Dependencies
```
Task 1 (创建 UTILS 模块) → Task 2 (挂载到 window) → Task 3 (替换 HTTP 调用)
```

---

## TODOs

- [x] 1. **创建 UTILS 全局对象和 request 封装模块**

  **What to do**:
  - 创建 `src/utils/global.ts`
  - 定义 `UTILS` 对象，包含：
    - `BASE_URL`: 使用 `import.meta.env.VITE_AI_BASE_URL || import.meta.env.VITE_CURRENT_VITE_URL`
    - `request`: axios 封装对象
  - `request.get(url, params, config)`: GET 请求封装
  - `request.post(url, data, config)`: POST 请求封装
  - 完整封装包含：自动 error Toast、自动 loading 状态（使用 showLoadingToast/closeToast）
  - 统一错误处理：catch 块自动 Toast 错误信息
  - 声明 `window.UTILS` 的 TypeScript 类型

  **Must NOT do**:
  - 不添加 axios 拦截器
  - 不实现缓存
  - 不拆分 api 目录

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单一文件创建，逻辑简单明确
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `test-driven-development`: 项目无测试基础设施

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 2, Task 3

  **References**:
  - `src/views/HealthDiary/HealthDiary.vue:141` - 当前 BASE_RUL 定义和错误处理模式
  - `src/views/HealthDiary/HealthDiary.vue:387-415` - showLoadingToast/closeToast 使用方式
  - `src/main.ts:10-13` - Toast 插件挂载方式
  - `vite.config.ts:58-64` - 代理配置

  **Acceptance Criteria**:
  - [ ] `src/utils/global.ts` 文件创建成功
  - [ ] UTILS 对象包含 BASE_URL 和 request 属性
  - [ ] request.get 和 request.post 方法签名正确
  - [ ] TypeScript 类型声明无错误

  **QA Scenarios**:

  \`\`\`
  Scenario: UTILS 模块可正常导入
    Tool: Bash
    Preconditions: src/utils/global.ts 已创建
    Steps:
      1. cd /Users/murasakiyoruwa/work/github-online
      2. pnpm type-check
    Expected Result: 无类型错误
    Evidence: .sisyphus/evidence/task-1-type-check.log
  \`\`\`

- [x] 2. **挂载 UTILS 到 window 对象**

  **What to do**:
  - 在 `src/utils/global.ts` 末尾添加 `window.UTILS = UTILS`
  - 在 `src/main.ts` 中导入 UTILS（确保在 app.mount 之前）
  - 确保类型声明被 TypeScript 识别

  **Must NOT do**:
  - 不修改其他 main.ts 内容
  - 不修改 App.vue

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 只需修改 2 个文件的 import 和赋值语句
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocked By**: Task 1
  - **Blocks**: Task 3

  **References**:
  - `src/main.ts:1-17` - 当前 main.ts 完整内容

  **Acceptance Criteria**:
  - [ ] `src/utils/global.ts` 底部有 `window.UTILS = UTILS`
  - [ ] `src/main.ts` 顶部有 `import './utils/global'` 或 `import UTILS from './utils/global'`
  - [ ] pnpm type-check 通过

  **QA Scenarios**:

  \`\`\`
  Scenario: window.UTILS 可在浏览器访问（dev server 运行时验证）
    Tool: Bash
    Preconditions: pnpm dev 正在运行
    Steps:
      1. 等待 dev server 启动完成
      2. curl http://localhost:8088 检查响应
    Expected Result: 页面正常加载，无 JS 错误
    Evidence: .sisyphus/evidence/task-2-dev-server.log
  \`\`\`

- [x] 3. **替换 HealthDiary.vue 中的所有 HTTP 调用**

  **What to do**:
  - 替换 `axios.get(\`${BASE_RUL}/api/weather\`...)` 为 `UTILS.request.get('/api/weather', { params: { cityId } })`
  - 替换 `axios.get(\`${BASE_RUL}/api/regeo\`...)` 为 `UTILS.request.get('/api/regeo', { params: { longitude, latitude } })`
  - 替换 `fetch(\`${...}/api/ai\`, { method: 'POST', ... })` 为 `UTILS.request.post('/api/ai', { prompt }, { headers: { 'Content-Type': 'application/json' } })`
  - 移除不再需要的 axios import（如果只用于这三个接口）
  - 移除 BASE_RUL 常量定义
  - 移除 fetch 相关代码

  **Must NOT do**:
  - 不修改 localStorage 相关逻辑
  - 不修改 UI 逻辑（formData、weather 状态等）
  - 不修改 html2canvas 截图逻辑

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 替换调用模式，逻辑简单
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocked By**: Task 2

  **References**:
  - `src/views/HealthDiary/HealthDiary.vue:231-256` - fetchWeather 函数
  - `src/views/HealthDiary/HealthDiary.vue:307-350` - fetchCurrentLocation 函数
  - `src/views/HealthDiary/HealthDiary.vue:352-416` - analyzeWithAI 函数

  **Acceptance Criteria**:
  - [ ] 文件中不存在 `axios.get`、`axios.post` 调用
  - [ ] 文件中不存在 `fetch(` 调用（AI 接口）
  - [ ] `BASE_RUL` 常量已删除
  - [ ] pnpm type-check 通过
  - [ ] pnpm lint --fix 通过

  **QA Scenarios**:

  \`\`\`
  Scenario: HealthDiary.vue 中无旧请求调用
    Tool: Bash
    Preconditions: Task 3 完成后
    Steps:
      1. grep -c "axios.get\|axios.post\|fetch(" src/views/HealthDiary/HealthDiary.vue
      2. echo $?
    Expected Result: 输出 0（无匹配）
    Failure Indicators: 输出 > 0 表示仍有旧调用
    Evidence: .sisyphus/evidence/task-3-grep-result.log

  Scenario: 天气查询功能正常
    Tool: Bash
    Preconditions: pnpm dev 运行中
    Steps:
      1. curl "http://localhost:8088/custom/ai/api/weather?cityId=101020100"
    Expected Result: JSON 响应，包含 weather 数据
    Failure Indicators: 返回错误或空数据
    Evidence: .sisyphus/evidence/task-3-weather-api.log
  \`\`\`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle` ✅
- [x] F2. **Code Quality Review** — `unspecified-high` ✅
- [x] F3. **Real Manual QA** — `unspecified-high` + `playwright` skill ✅
- [x] F4. **Scope Fidelity Check** — `deep` ✅ (dist/ is untracked, pre-existing repo issue)

---

## Commit Strategy
- 1 commit: `feat(utils): add window.UTILS global object and request wrapper`

---

## Success Criteria

### Verification Commands
```bash
# 浏览器控制台验证
window.UTILS
window.UTILS.BASE_URL
window.UTILS.request.get
window.UTILS.request.post
```

### Final Checklist
- [ ] window.UTILS 存在
- [ ] BASE_URL 值正确
- [ ] request.get/post 方法可用
- [ ] HealthDiary.vue 无 axios/fetch 裸调用
- [ ] 三个功能手动测试通过
