# PokerKing Nairobi Website

PokerKing Nairobi 官网静态站点（无需安装任何前端框架），用于展示：

- 品牌首页与核心介绍
- 现金桌信息（Cash Games）
- 锦标赛与赛程（Tournaments / Agenda）
- 场地图库（Gallery）
- 联系方式与报名入口

## 技术方案

为保证你后续维护最简单，本站使用：

- `HTML` + `CSS` + `JavaScript`（纯静态）
- 无构建工具、无 npm、无额外依赖

你只需要一个浏览器就能预览。

## 文件结构

- `index.html`：官网首页
- `agenda.html`：赛事日程页
- `cash-games.html`：现金桌页
- `tournaments.html`：锦标赛页
- `gallery.html`：图库页
- `contact.html`：联系与到场信息
- `css/styles.css`：全站样式
- `js/main.js`：移动菜单、年份等基础交互
- `assets/`：Logo 与海报图片素材

## 本地预览

直接双击任意 `html` 文件即可打开。

如果你想更接近线上访问方式，可在当前目录运行：

```bash
python3 -m http.server 8080
```

然后访问：`http://localhost:8080`

## 素材说明

- Logo：`assets/logo.png`（你提供的品牌图）
- 海报：已通过 RunningHub 生成并放在 `assets/` 目录
