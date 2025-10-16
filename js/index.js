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
  const commandLine = document.getElementById('commandLine');
  const copyBtn = document.getElementById('copyBtn');

  const disableWebSecurity = document.getElementById('disableWebSecurity');
  const allowRunningInsecureContent = document.getElementById('allowRunningInsecureContent');
  const disableSiteIsolation = document.getElementById('disableSiteIsolation');
  const reduceSecurity = document.getElementById('reduceSecurity');
  const ignoreCertErrors = document.getElementById('ignoreCertErrors');
  const noSandbox = document.getElementById('noSandbox');
  const incognito = document.getElementById('incognito');
  const remoteDebugging = document.getElementById('remoteDebugging');
  const noFirstRun = document.getElementById('noFirstRun');
  const disableExtensions = document.getElementById('disableExtensions');
  const disableGpu = document.getElementById('disableGpu');
  const startMaximized = document.getElementById('startMaximized');
  const disablePopupBlocking = document.getElementById('disablePopupBlocking');
  const disableInfobars = document.getElementById('disableInfobars');
  const disableTranslate = document.getElementById('disableTranslate');
  const disableBackgroundNetworking = document.getElementById('disableBackgroundNetworking');

  let currentOS = 'windows';

  const defaultPaths = {
    'windows': 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    'macos': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'linux': '/usr/bin/google-chrome'
  };

  const pathHints = {
    'windows': '默认路径适用于大多数情况，如果Chrome安装在其他位置，请手动修改',
    'macos': '如果Chrome不在默认位置，请手动修改路径',
    'linux': '如果使用Chrome而不是Chromium，请检查路径是否正确'
  };

  const pathHintsEn = {
    'windows': 'The default path works for most cases. If Chrome is installed elsewhere, please modify it manually.',
    'macos': 'If Chrome is not in the default location, please modify the path manually.',
    'linux': 'If using Chrome instead of Chromium, please check if the path is correct'
  }

  function updatePath() {
    const lang = window.location.href.includes('/index-en.html') ? 'en' : 'zh';
    chromePath.value = defaultPaths[currentOS];
    pathHint.textContent = lang === 'en' ? pathHintsEn[currentOS] : pathHints[currentOS];
    updateCommandLine();
  }

  osButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      osButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOS = btn.dataset.os;
      updatePath();
    });
  });

  const uaPresets = {
    'mobile': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
    'tablet': 'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    'desktop_win': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'desktop_mac': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'desktop_linux': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'firefox': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:118.0) Gecko/20100101 Firefox/118.0',
    'safari': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
    'edge': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43'
  };

  function updateUAPreview() {
    let selectedUA = userAgent.value;
    if (selectedUA === 'custom') {
      customUAContainer.style.display = 'block';
      if (customUA.value.trim() !== '') {
        uaPreviewText.textContent = customUA.value;
      } else {
        uaPreviewText.textContent = '请输入自定义用户代理字符串';
      }
    } else if (selectedUA) {
      customUAContainer.style.display = 'none';
      uaPreviewText.textContent = uaPresets[selectedUA] || '未知用户代理';
    } else {
      customUAContainer.style.display = 'none';
      uaPreviewText.textContent = '尚未选择用户代理';
    }
    updateCommandLine();
  }

  userAgent.addEventListener('change', updateUAPreview);
  customUA.addEventListener('input', updateUAPreview);

  function updateCommandLine() {
    let cmd = `"${chromePath.value}"`;

    if (proxyServer.value.trim() !== '') {
      let proxyTypeValue = proxyType.value;
      let server = proxyServer.value.trim();
      let port = proxyPort.value.trim() || '8080';
      cmd += ` --proxy-server=${proxyTypeValue}://${server}:${port}`;

      if (proxyBypass.value.trim() !== '') {
        cmd += ` --proxy-bypass-list=${proxyBypass.value.trim()}`;
      }
    }

    let selectedUA = userAgent.value;
    if (selectedUA === 'custom' && customUA.value.trim() !== '') {
      cmd += ` --user-agent="${customUA.value.trim()}"`;
    } else if (selectedUA && selectedUA !== '') {
      cmd += ` --user-agent="${uaPresets[selectedUA]}"`;
    }

    if (disableWebSecurity.checked) cmd += ' --disable-web-security';
    if (allowRunningInsecureContent.checked) cmd += ' --allow-running-insecure-content';
    if (disableSiteIsolation.checked) cmd += ' --disable-site-isolation-trials';
    if (reduceSecurity.checked) cmd += ' --reduce-security-for-testing';
    if (ignoreCertErrors.checked) cmd += ' --ignore-certificate-errors';
    if (noSandbox.checked) cmd += ' --no-sandbox';
    if (incognito.checked) cmd += ' --incognito';
    if (remoteDebugging.checked) cmd += ' --remote-debugging-port=9222';
    if (noFirstRun.checked) cmd += ' --no-first-run';
    if (disableExtensions.checked) cmd += ' --disable-extensions';
    if (disableGpu.checked) cmd += ' --disable-gpu';
    if (startMaximized.checked) cmd += ' --start-maximized';
    if (disablePopupBlocking.checked) cmd += ' --disable-popup-blocking';
    if (disableInfobars.checked) cmd += ' --disable-infobars';
    if (disableTranslate.checked) cmd += ' --disable-translate';
    if (disableBackgroundNetworking.checked) cmd += ' --disable-background-networking';

    commandLine.textContent = cmd;
  }

  [chromePath, proxyType, proxyServer, proxyPort, proxyBypass].forEach(el => {
    el.addEventListener('input', updateCommandLine);
  });

  [
    disableWebSecurity, allowRunningInsecureContent, disableSiteIsolation, reduceSecurity,
    ignoreCertErrors, noSandbox, incognito, remoteDebugging, noFirstRun,
    disableExtensions, disableGpu, startMaximized, disablePopupBlocking,
    disableInfobars, disableTranslate, disableBackgroundNetworking
  ].forEach(el => {
    el.addEventListener('change', updateCommandLine);
  });

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(commandLine.textContent).then(() => {
      copyBtn.textContent = '已复制!';
      setTimeout(() => {
        copyBtn.textContent = '复制命令行';
      }, 2000);
    });
  });

  updatePath();
  updateUAPreview();
  updateCommandLine();
});