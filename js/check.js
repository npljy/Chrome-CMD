!(function () {
  fetch('https://ipcheck.xuehuayu.cn')
    .then(res => res.json())
    .then(data => {
      const href = window.location.href;
      if (data.isChina) {
        if (window.location.hostname === 'chrome.cainiaoblog.cn') {
          window.location.href = href.replace('://chrome.cainiaoblog.cn', '://chrome.xuehuayu.cn');
        }
      } else {
        if (window.location.hostname === 'm3u8.xuehuayu.cn') {
          window.location.href = href.replace('://chrome.xuehuayu.cn', '://chrome.cainiaoblog.cn');
        }
      }
    });
})()
