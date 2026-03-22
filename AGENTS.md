# AGENTS.md — claw-notes 开发指南

> **这个文件是写给 AI Agent 的。** 如果你是负责开发或维护这个项目的 AI，从这里开始。

---

## 项目是什么

`claw-notes` 是一个双语 AI 日记站点。内容由 AI（lif3ng's claw）撰写，记录每天的学习与教学。

- **内容目录：** `content/YYYY/MM-DD.{meta.yaml,zh.md,en.md}`
- **8 个框架：** 每个框架独立渲染同一份内容
- **语言：** 中文默认，localStorage 切换英文，URL 不变
- **部署：** GitHub Pages，主站 + 各框架子路径

---

## 每日工作流

每晚 23:00 (GMT+8) 执行：

1. 整理当天的学习内容（来自 memory、对话、任务）
2. 通过 Feishu 发给 lif3ng 确认（用户 ID: ou_3bbc33b9038eb6ccd28ac38bfdb90c95）
3. 收到确认后生成 3 个文件：
   - `content/YYYY/MM-DD.meta.yaml`
   - `content/YYYY/MM-DD.zh.md`
   - `content/YYYY/MM-DD.en.md`
4. 提交并推送：
   ```bash
   cd /root/.openclaw/workspace/claw-notes
   git add content/
   git commit -m "diary: YYYY-MM-DD — <title_zh>"
   git push origin main
   ```
5. CI 自动触发，各框架重新构建部署

**git 身份：**
```bash
git config user.name "lif3ng's claw"
git config user.email "claw@lif3ng.cn"
```

**远程地址：**
```
https://<GITHUB_TOKEN>@github.com/lif3ng/claw-notes.git
```

> token 存在环境变量 `GITHUB_TOKEN` 中，推送时替换占位符，或直接用 `gh` CLI。

---

## 内容格式规范

### meta.yaml

```yaml
date: YYYY-MM-DD
title_zh: 中文标题
title_en: English Title
tags:
  - tag1
  - tag2
```

### zh.md / en.md

- 纯正文，无 frontmatter
- 200-800 字
- 第一人称，像真人写日记
- 中文版用中文，英文版用英文（不是翻译，是同主题的自然表达）
- 技术术语中文版保留英文原文

---

## 目录结构

```
claw-notes/
  content/
    2026/
      03-22.meta.yaml
      03-22.zh.md
      03-22.en.md
  web/
    nextjs/       # Next.js 14, App Router, SSG
    astro/        # Astro 4, 零 JS 优先
    nuxt/         # Nuxt 3, SSG 模式
    sveltekit/    # SvelteKit, static adapter
    hugo/         # Hugo, Go 模板
    eleventy/     # Eleventy 2, Nunjucks 模板
    vuepress/     # VuePress 2
    vitepress/    # VitePress 1
  .github/
    workflows/
      ci-nextjs.yml
      ci-astro.yml
      ci-nuxt.yml
      ci-sveltekit.yml
      ci-hugo.yml
      ci-eleventy.yml
      ci-vuepress.yml
      ci-vitepress.yml
  AGENTS.md
  README.md
```

---

## 各框架说明

### 共同要求

每个框架必须实现：
1. **首页** — 日记列表，按日期倒序，显示标题和日期
2. **详情页** — 单篇日记，显示标题、日期、正文
3. **语言切换** — localStorage key: `claw-notes-lang`，值: `zh`（默认）或 `en`
4. **base path** — 部署在 `/web/<框架名>/` 子路径下

### 内容读取方式

各框架从 `../../content/` 相对路径读取 content 目录（构建时）。

### 框架特定配置

| 框架 | base | 包管理 | 构建命令 | 输出目录 |
|------|------|--------|----------|----------|
| nextjs | `/web/nextjs` | npm | `next build` | `out/` |
| astro | `/web/astro` | npm | `astro build` | `dist/` |
| nuxt | `/web/nuxt` | npm | `nuxt generate` | `.output/public/` |
| sveltekit | `/web/sveltekit` | npm | `vite build` | `build/` |
| hugo | `/web/hugo` | - | `hugo` | `public/` |
| eleventy | `/web/eleventy` | npm | `eleventy` | `_site/` |
| vuepress | `/web/vuepress` | npm | `vuepress build src` | `src/.vuepress/dist/` |
| vitepress | `/web/vitepress` | npm | `vitepress build` | `.vitepress/dist/` |

---

## CI 规范

每个 workflow 文件（`.github/workflows/ci-<框架>.yml`）：

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'content/**'
      - 'web/<框架>/**'
      - '.github/workflows/ci-<框架>.yml'
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - # 安装依赖、构建
      - # 部署到 gh-pages 分支的 web/<框架>/ 子目录
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web/<框架>/<输出目录>
          destination_dir: web/<框架>
          keep_files: true
```

**注意：** `keep_files: true` 确保各框架部署互不覆盖。

---

## 添加新框架

1. 在 `web/` 下创建新目录
2. 实现首页、详情页、语言切换
3. 配置 base path
4. 添加 `.github/workflows/ci-<框架>.yml`
5. 更新 `README.md` 的访问链接列表
6. 更新本文件的框架表格

---

## 主站配置

用户选定主框架后：
1. 在对应框架的 CI workflow 中添加第二个部署步骤，将产物部署到根目录（`destination_dir: .`）
2. 更新 README 主站链接
3. 在本文件记录选定的主框架

**当前主站框架：** VitePress（同时部署到根目录和 `/web/vitepress/`）