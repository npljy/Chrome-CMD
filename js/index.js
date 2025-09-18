document.addEventListener('DOMContentLoaded', function () {
    const osButtons = document.querySelectorAll('.os-btn');
    const chromePath = document.getElementById('chromePath');
    const pathHint = document.getElementById('pathHint');
    const proxyType = document.getElementById('proxyType');
    const proxyServer = document.getElementById('proxyServer');
    const proxyPort = document.getElementById('proxyPort');
    const proxyBypass = document.getElementById('proxyBypass');
    const userAgent = document.getElementById('userAgent');
    const customUAContainer = document.getElementById('customUAContainer');
    const customUA = document.getElementById('customUA');
    const uaPreviewText = document.getElementById('uaPreviewText');
    const incognito = document.getElementById('incognito');
    const disableWebSecurity = document.getElementById('disableWebSecurity');
    const ignoreCertErrors = document.getElementById('ignoreCertErrors');
    const disableExtensions = document.getElementById('disableExtensions');
    const commandLine = document.getElementById('commandLine');
    const copyBtn = document.getElementById('copyBtn');

    let currentOS = 'windows';

    // 操作系统默认路径
    const defaultPaths = {
        'windows': 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'macos': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        'linux': '/usr/bin/google-chrome'
    };

    // 路径提示信息
    const pathHints = {
        'windows': '默认路径适用于大多数情况，如果Chrome安装在其他位置，请手动修改',
        'macos': '如果Chrome不在默认位置，请手动修改路径',
        'linux': '如果使用Chrome而不是Chromium，请确保路径正确'
    };

    // 用户代理预设
    const userAgentPresets = {
        'mobile': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
        'tablet': 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1',
        'desktop_win': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'desktop_mac': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'desktop_linux': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'firefox': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'safari': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        'edge': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59'
    };

    // 操作系统切换
    osButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            osButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentOS = this.dataset.os;
            updateChromePath();
            updateCommandLine();
        });
    });

    // 更新Chrome路径
    function updateChromePath() {
        chromePath.value = defaultPaths[currentOS];
        pathHint.textContent = pathHints[currentOS];
    }

    // 显示/隐藏自定义UA输入框
    userAgent.addEventListener('change', function () {
        if (userAgent.value === 'custom') {
            customUAContainer.style.display = 'block';
            updateUAPreview(customUA.value);
        } else {
            customUAContainer.style.display = 'none';
            updateUAPreview(userAgentPresets[userAgent.value] || '');
        }
        updateCommandLine();
    });

    // 自定义UA输入事件
    customUA.addEventListener('input', function () {
        if (userAgent.value === 'custom') {
            updateUAPreview(customUA.value);
        }
        updateCommandLine();
    });

    // 更新UA预览
    function updateUAPreview(uaString) {
        if (uaString) {
            uaPreviewText.textContent = uaString;
        } else {
            uaPreviewText.textContent = '尚未选择用户代理';
        }
    }

    // 为所有输入添加事件监听
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input.id !== 'customUA') {
            input.addEventListener('input', updateCommandLine);
            input.addEventListener('change', updateCommandLine);
        }
    });

    // 更新命令行
    function updateCommandLine() {
        let command = '';

        // 添加Chrome路径（带引号处理空格）
        if (chromePath.value) {
            const path = chromePath.value.trim();
            if (path.includes(' ')) {
                command += `"${path}"`;
            } else {
                command += path;
            }
        } else {
            command += currentOS === 'windows' ? 'chrome' : 'google-chrome';
        }

        // 添加代理设置（服务器和端口分开）
        const server = proxyServer.value.trim();
        const port = proxyPort.value.trim();

        if (server && port) {
            const type = proxyType.value;
            // 组合服务器地址和端口
            const proxyAddress = `${server}:${port}`;
            command += ` --proxy-server="${type}://${proxyAddress}"`;

            if (proxyBypass.value) {
                command += ` --proxy-bypass-list="${proxyBypass.value}"`;
            }
        } else if (server) {
            // 如果只有服务器没有端口，使用默认格式
            const type = proxyType.value;
            command += ` --proxy-server="${type}://${server}"`;

            if (proxyBypass.value) {
                command += ` --proxy-bypass-list="${proxyBypass.value}"`;
            }
        }

        // 添加用户代理
        let uaValue = '';
        if (userAgent.value === 'custom' && customUA.value) {
            uaValue = customUA.value;
        } else if (userAgent.value && userAgent.value !== 'custom') {
            uaValue = userAgentPresets[userAgent.value];
        }

        if (uaValue) {
            command += ` --user-agent="${uaValue}"`;
        }

        // 添加其他选项
        if (incognito.checked) {
            command += ' --incognito';
        }

        if (disableWebSecurity.checked) {
            command += ' --disable-web-security';
        }

        if (ignoreCertErrors.checked) {
            command += ' --ignore-certificate-errors';
        }

        if (disableExtensions.checked) {
            command += ' --disable-extensions';
        }

        // 更新命令行显示
        commandLine.textContent = command || '# 请在上面配置参数以生成命令行';
    }

    // 复制功能
    copyBtn.addEventListener('click', function () {
        const textArea = document.createElement('textarea');
        textArea.value = commandLine.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // 显示复制成功反馈
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // 初始化
    updateChromePath();
    updateCommandLine();
});