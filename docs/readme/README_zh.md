# picky-client

[English](../../README.md) · **简体中文** · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Français](README_fr.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md) · [Ελληνικά](README_el.md)

**让你的智能体负责设计，自己做一位挑剔的客户，把服务的设计品质推向极致。**

比较实际渲染的 UI/UX 方案，选出你想要的方向。设计确定后，智能体会将它应用到实际页面，并检查结果。

## 从你的智能体开始

把下面这句话复制到你的编程智能体中：

```text
请阅读 https://github.com/daviddev90/picky-client.git 仓库中的 README，并在你当前的智能体环境中安装 picky-client。
```

安装完成后，在产品项目中请求第一轮方案：

```text
请用 picky-client 为这个仪表盘制作 3–5 个布局方案。保留现有颜色、字体和功能，让我先在浏览器中比较，再做选择。
```

智能体会调研案例、制作候选方案，检查它们在浏览器中的实际显示效果，再提供你能访问的评审链接。你只需浏览方案并作出选择。

## 一轮如何进行

1. 你指定页面和需要决定的设计事项。
2. 智能体调研案例、制作方案，并在实际浏览器中检查。
3. 你比较方案并作出选择。
4. 你批准下一轮，或者确定设计并要求智能体将它应用到实际页面。

每一轮只决定一个尚未确定的设计要素。已经选定的方向会保留下来，下一轮就在你认可的设计基础上继续。

| 要决定的事项 | 比较内容 |
|---|---|
| 氛围、视觉个性，或可用性相当的构图 | 10 个各有特色的方向 |
| 布局、控件、信息密度或导航 | 3–5 个有依据的方案，并说明可用性方面的利弊 |
| 只剩下一个有意义的选项 | 有依据的推荐方案 |
| 主题已经确定 | 保留既定颜色、字体风格和材质表现的方案 |

## 选择、完善、应用

告诉智能体你选了哪个方案，以及接下来要做什么。例如：

```text
我选 2 号方案。请保留这个布局，接下来提议一轮排版设计比较。
```

```text
设计已经确定。请把 2 号方案应用到实际页面，并验证功能和各个界面状态。
```

智能体会等你作出决定后再继续。应用设计时，会保留现有功能，将选定的布局与实际页面结构衔接，并检查渲染结果。

## 让选择更有价值

- **参考真实案例：** 每轮都会调研提供相同功能或承担类似角色的服务，并了解当前的设计实践。
- **在相同条件下比较：** 视觉候选方案共用经过审查的文案，已经确定的设计要素保持不变。
- **交付前先检查：** 交付前检查浏览器中的显示效果和页面切换，并提供你能在自己的设备上访问的评审链接。
- **保留决策记录：** 项目的 `docs/picky-client.md` 记录候选方案、调研、检查结果和最终选择。确定后的设计规范保存在 `docs/picky-client-design.md`。
- **清理生产构建：** 删除临时评审界面及其接入代码，并检查它们已从生产构建产物中排除。

内置评审界面使用 React、TypeScript、Vite、React Router、Tailwind 和 Motion。其他技术栈需要调整接入方式；原生产品先用网页预览选择设计，再应用到自己的技术栈中。支持子智能体的环境会委派制作和评审任务。其他环境按顺序执行，并记录由同一个智能体完成评审。

## 安装详情

<details>
<summary>安装智能体须知、手动命令与调用方式</summary>

### 给负责安装的智能体

优先遵循用户指定的安装方式和范围。未指定时，Codex 或 Claude Code 使用下面的原生插件方式，其他环境使用匹配的 Skills CLI ID。原生插件默认安装到当前用户范围，Skills CLI 默认安装到项目范围。请安装完整的技能文件夹，包括参考文档、脚本和资源。确认环境实际能够发现该技能后，再说明调用方式以及当前环境要求的重新加载步骤。

### Skills CLI

技能的权威源文件位于 [skills/picky-client](../../skills/picky-client)。使用 Node.js 22.20.0 或更高版本，在项目目录中运行 [Skills CLI](https://github.com/vercel-labs/skills)：

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

按提示选择智能体，或直接指定：

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| 智能体 | `--agent` ID |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode，包括 oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

添加 `-g` 可安装到该智能体的用户级位置。手动安装到项目时，可将整个 `skills/picky-client` 文件夹复制到 `.agents/skills/`；[OpenCode](https://opencode.ai/docs/skills/) 和 [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide) 都支持这个路径。oh-my-opencode 使用 OpenCode 的技能安装方式。

### Claude Code 插件

Claude Code 2.1.292 或更高版本，在终端中运行：

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

旧版本可使用以下两条命令：

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

在会话中，2.1.275 或更高版本支持 `/plugin install picky-client --marketplace daviddev90/picky-client`。参见 [Claude Code 插件安装文档](https://code.claude.com/docs/en/discover-plugins)。

### Codex 插件

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

在 Codex 中输入 `/plugins` 即可浏览插件。参见 [Codex CLI 参考文档](https://learn.chatgpt.com/docs/cli/reference)。

两个插件都使用根目录中的技能权威来源 `skills/`。根目录的 [plugin.json](../../plugin.json) 用于打包可移植的 Codex 插件，[.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) 提供 Claude Code 兼容信息。参见 [插件打包文档](https://developers.openai.com/plugins/build/plugins)。

### 显式调用

| 安装方式 | 调用方式 |
|---|---|
| Codex 插件 | `$picky-client:picky-client` |
| Codex 独立技能 | `$picky-client` |
| Claude Code 插件 | `/picky-client:picky-client` |
| Claude Code 独立技能 | `/picky-client` |

在其他智能体中，请直接要求使用 picky-client。候选方案和评审界面的标签使用你的工作语言，工具名称保持为 `PICKY-CLIENT DRAFTS`。

</details>

完整流程请阅读[技能文档](../../skills/picky-client/SKILL.md)。

## 许可证

MIT © daviddev90
