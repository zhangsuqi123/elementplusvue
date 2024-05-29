
// 设置 cookie 函数
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 获取 cookie 函数
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 删除 cookie 函数
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

// 示例用法
setCookie('testCookie', 'testValue', 7); // 设置一个名为 'testCookie' 的 cookie，值为 'testValue'，有效期为 7 天
const cookieValue = getCookie('testCookie'); // 获取名为 'testCookie' 的 cookie 的值
eraseCookie('testCookie'); // 删除名为 'testCookie' 的 cookie
console.log(cookieValue)
