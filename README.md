
## 📝更新日志

见[CHANGELOG.md](https://cdn.jsdelivr.net/gh/Achuan-2/siyuan-plugin-template@main/CHANGELOG.md)


## 📄 许可证

AGPL v3.0 License

## 🔧 开发

```bash
pnpm install
pnpm run dev
```

`pnpm build` 生成 `dist/` 和 `package.zip`，然后自动将 `dist/` 同步到思源工作空间；`pnpm dev` 每次构建完成后同步 `dev/`。同步会等待静态资源写入完成，插件子目录由 `plugin.json` 的 `name` 决定。

默认目标插件目录为 `D:\Notes\Siyuan\Achuan-2\data\plugins`。可通过环境变量 `SIYUAN_PLUGIN_DIR` 覆盖，或修改 `scripts/make_dev_copy.js`。复制会覆盖同名产物，保留目标目录的其他文件。

同步失败会单独输出警告，构建产物仍保留。可运行 `pnpm make_dev_copy dist` 重试生产产物同步；开发产物使用 `pnpm make_dev_copy dev`（省略参数时默认 `dev`）。


## 🙏 致谢

- 基于 [plugin-sample-vite-svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte/) 模板开发

## ❤️项目贡献者

<a href="https://github.com/Achuan-2/siyuan-plugin-template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Achuan-2/siyuan-plugin-template" />
</a>

Made with [contrib.rocks](https://contrib.rocks).


## ❤️用爱发电

如果喜欢我的插件，欢迎给GitHub仓库点star和微信赞赏，这会激励我继续完善此插件和开发新插件。


![image](https://assets.b3logfile.com/siyuan/1610205759005/assets/network-asset-image-20250614123558-fuhir5v.png)
