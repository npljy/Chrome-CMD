# Chrome 命令行参数生成器
一个可视化工具，用来快速生成 Chrome 启动参数，让你通过选择或填写配置就能得到一条可以复制执行的命令。

### 体验地址

[https://chrome.xuehuayu.cn](https://chrome.xuehuayu.cn/&utm_source=https://github.com/npljy)

### 是什么

Chrome 命令行生成器是一个前端工具，你无需查阅繁复文档，只需通过简洁的 UI 填写或选项切换，就可以得到你想要的 Chrome 启动命令行。

### 功能亮点

直观配置：用户数据目录、启动页 URL、远程调试端口等，一目了然。
附加参数支持：隐身模式、无头模式、禁用扩展等常用选项。
安全提示：对于存在潜在风险的参数会给予明确标识。
一键复制：生成后可快速复制命令，无需手动选中全部内容。

### 快速示例

```cmd
"chrome" --user-data-dir="你的用户数据目录" --remote-debugging-port=9222 --incognito --disable-extensions "https://www.example.com"
```
      
### 使用建议

* 尽量使用新的用户数据目录，以免影响现有浏览器配置。
* 在安全环境中使用远程调试端口，避免暴露。
* 不要在生产或公共环境中使用可能降低安全性的参数（比如 --disable-web-security）。

> 注意：某些参数可能会严重影响浏览器的安全性，仅建议在测试或受控环境中启用，不应在普通使用场景或不信任环境中使用。

### 友情推荐

[m3u8在线加速去广告播放器](https://www.xuehuayu.cn/article/c3fcb716)
