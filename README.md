# GitHub Pages 部署包（Belbin）

把本目录所有文件 **原样放到你的仓库根目录**（或 `docs/` 目录），并保证你的应用入口页面命名为 `index.html`。

## 你需要做的两件事

1) **把你现在的 HTML 改名为 `index.html`**（或复制一份为 `index.html`）。  
2) 在你的 HTML 里加入下面两行（分别放在 `<head>` 与 `</body>` 前）：

```html
<!-- head 里 -->
<link rel="manifest" href="./manifest.webmanifest">
<link rel="icon" href="./favicon.ico">
<!-- body 末尾 -->
<script src="./sw-register.js"></script>
```

> 你的页面如果已经包含这几行，就不需要重复加。

## GitHub Pages 打开方法
- 打开仓库 -> **Settings** -> **Pages** -> **Build and deployment**：
  - Source 选择 **Deploy from a branch**，Branch 选 **main**（或你使用的分支），目录选 **/**（或 `docs/`）。
  - 保存后大约几十秒会生效，访问显示的 Pages URL 即可。

## PWA（可安装）
本包已经包含 `manifest.webmanifest` 与 `service-worker.js`：
- 支持“添加到主屏幕”和离线访问（首次加载后可离线访问缓存内容）。
- 如需更新缓存，将 `service-worker.js` 里的 `belbin-cache-v1` 修改为新版本号并重新提交。

## 可选（若你用 `docs/` 目录）
- 如果你把所有文件放在 `docs/`，那么 Pages 设置里目录需要选 `docs`，其余不变。
