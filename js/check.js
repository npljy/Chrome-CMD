
!(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location.href);
    if (url.searchParams.get('url')) return;
    fetch('https://ipcheck.xuehuayu.cn')
      .then(res => res.json())
      .then(data => {
        const btn = document.getElementById('area');
        if (!btn) return;
        const href = url.toString();
        if (data.isChina) {
          if (window.location.hostname === 'm3u8.cainiaoblog.cn') {
            btn.innerHTML = '中国站';
            btn.href = href.replace('://m3u8.cainiaoblog.cn', '://m3u8.xuehuayu.cn');
          }
        } else {
          if (window.location.hostname === 'm3u8.xuehuayu.cn') {
            btn.innerHTML = '国际站';
            btn.href = href.replace('://m3u8.xuehuayu.cn', '://m3u8.cainiaoblog.cn');
          }
        }
      });
  })
})();
