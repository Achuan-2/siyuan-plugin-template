## 📝 Changelog

See [CHANGELOG.md](https://cdn.jsdelivr.net/gh/Achuan-2/siyuan-plugin-copilot@main/CHANGELOG.md)


## 📄 License

AGPL v3.0 License


## 🔧 Development

```bash
pnpm install
pnpm run dev
```

`pnpm build` generates `dist/` and `package.zip`, then automatically copies `dist/` to the SiYuan workspace. `pnpm dev` copies `dev/` after every build. Both modes wait for static assets to finish writing and use the plugin name from `plugin.json` as the destination subdirectory.

Set `SIYUAN_PLUGIN_DIR` to override the default plugins directory in `scripts/make_dev_copy.js`. Copies replace matching build files and preserve other destination files. Sync failures are reported separately; retry with `pnpm make_dev_copy dist` or `pnpm make_dev_copy dev` (the default).


## 🙏 Acknowledgments

- Developed based on the [plugin-sample-vite-svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte/) template

## ❤️ Tips Are Welcome

If you find this plugin useful, you're welcome to leave a tip or give the repository a star on GitHub. Your support helps me maintain and improve this plugin and develop new ones. Thank you for your support!

[Leave a tip](https://pancake.waffo.ai/store/achuan-2-fdbho4ye/product/PROD_3F7Aa7c2NQlz9KmxcgxjQ7?type=onetime&currency=USD)
