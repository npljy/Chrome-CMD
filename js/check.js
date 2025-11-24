!(function () {
  fetch('https://ipcheck.xuehuayu.cn')
    .then(res => res.json())
    .then(data => {
      if (data.isChina) {
        if (window.location.hostname === 'm3u8.cainiaoblog.cn') {
          window.location.href = window.location.href.replace('://m3u8.caoniaoblog.cn', '://m3u8.xuehuayu.cn');
        }
      } else {
        if (window.location.hostname === 'm3u8.xuehuayu.cn') {
          window.location.href = window.location.href.replace('://m3u8.xuehuayu.cn', '://m3u8.caoniaoblog.cn');
        }
      }
    });
})()
