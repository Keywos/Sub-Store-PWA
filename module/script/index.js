// 转换时间: 2023/8/13 15:47:32
function strToArray(str) {
  var ret = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
}

let done = $done;
let result = {
  response: {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: strToArray(
      '<!DOCTYPE html>\n<html lang="zh-CN">\n\n<head>\n  <meta charset="UTF-8" />\n  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />\n  <meta http-equiv="Pragma" content="no-cache" />\n  <meta http-equiv="Expires" content="0" />\n  <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n  <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport" />\n  <title>Sub Store</title>\n  <meta name="description" content="A sub-converter running in a Progressive Web App" />\n  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />\n  <link rel="alternate icon" href="/favicon.ico" type="image/png" sizes="16x16" />\n  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />\n  <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF" />\n  <meta id="theme__color" name="theme-color" content="#000" />\n  <link rel="manifest" href="/manifest.json" />\n  <style>\n    html {\n      background: #f2f2f2;\n    }\n    @media (prefers-color-scheme: dark) {\n      html {\n        background: #000;\n      }\n    }\n  </style>\n  <script async type="module" crossorigin src="/index.js"></script>\n</head>\n\n<body>\n  <div id="app"></div>\n  \n  <noscript>\n    <strong>We\'re sorry but <%= htmlWebpackPlugin.options.title %> doesn\'t work\n        properly without JavaScript enabled. Please enable it to\n        continue.</strong>\n  </noscript>\n</body>\n\n</html>'
    ),
  },
};
done(result);
