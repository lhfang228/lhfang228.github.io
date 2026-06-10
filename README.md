# lhfang228.github.io — 个人学术主页

**https://lhfang228.github.io** 是你的 **个人主页**（About / News / Publications / Contact）。

与 **CogStereo 项目主页** 分开：

| 站点 | 目录 | 用途 |
|------|------|------|
| 个人主页 | 本仓库 `lhfang228.github.io/` | 介绍 Lihuang Fang、论文列表、联系方式 |
| CogStereo 项目页 | `free-claude-code/CogStereo/` 或 `github.com/lhfang228/CogStereo` | 论文 teaser、实验图、零样本表格 |

可选：把 CogStereo 项目页部署为 **子路径** `https://lhfang228.github.io/CogStereo/`（在 Pages 仓库里建 `CogStereo/` 文件夹）。

## 本地预览

```bash
python3 -m http.server 8766
# http://localhost:8766
```

## 首次部署

```bash
git init
git add .
git commit -m "Personal academic homepage"
git remote add origin git@github.com:lhfang228/lhfang228.github.io.git
git push -u origin main
```

GitHub → **Settings → Pages** → Branch `main` / root.

## 更新头像

```bash
bash scripts/fetch_scholar_photo.sh
```
