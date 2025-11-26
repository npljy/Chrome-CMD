!(function () {
  fetch('https://ipcheck.xuehuayu.cn')
    .then(res => res.json())
    .then(data => {
      if (data.isChina) {
        if (window.location.hostname === 'chrome.cainiaoblog.cn') {
          window.location.href = window.location.href.replace('://chrome.cainiaoblog.cn', '://chrome.xuehuayu.cn');
        }
      } else {
        if (window.location.hostname === 'm3u8.xuehuayu.cn') {
          window.location.href = window.location.href.replace('://chrome.xuehuayu.cn', '://chrome.cainiaoblog.cn');
        }
      }
    });
})()
