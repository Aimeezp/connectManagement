function adapt(designWidth, rem2px) {
  const maxWidth = 750;// 最大宽度
  const d = window.document.createElement('div');

  d.style.width = '1rem';

  d.style.display = 'none';

  const head = window.document.getElementsByTagName('head')[0];

  head.appendChild(d);

  const defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));

  d.remove();

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  windowWidth = windowWidth > maxWidth ? maxWidth : windowWidth;
  windowHeight = windowHeight > maxWidth ? maxWidth : windowHeight;

  document.documentElement.style.fontSize = `${(((windowWidth / designWidth) * rem2px) / defaultFontSize) * 100}%`;

  const st = document.createElement('style');

  const portrait = `@media screen and (min-width: ${windowWidth}px) {html{font-size:${(windowWidth / (designWidth / rem2px) / defaultFontSize) * 100}%;}}`;// 竖屏
  const landscape = `@media screen and (min-width: ${windowHeight}px) {html{font-size:${(windowHeight / (designWidth / rem2px) / defaultFontSize) * 100}%;}}`;// 横屏

  st.innerHTML = portrait + landscape;

  head.appendChild(st);

  return defaultFontSize;
}

adapt(375, 100);
