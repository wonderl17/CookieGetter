// // const res = document.querySelector("#res");
const urlInput = document.createElement("input");
const button = document.createElement("button");
button.innerHTML = "获取cookie";
button.style = `position: fixed; z-index: 999; top: 5px; right: 5px`;
urlInput.style = `position: fixed; z-index: 999; top: 25px; right: 5px`;

document.body.appendChild(button);
document.body.appendChild(urlInput);

function copyToClipboard(text) {
  var input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

button.addEventListener("click", function () {
  // 获取当前页面的URL
  var currentUrl = window.location.href;

  // 向background script发送消息，请求获取cookie
  chrome.runtime.sendMessage({ action: "getCookie", url: currentUrl });
});

// console.log(button);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // 如果消息是来自content script的cookie
  if (request.action === "cookie") {
    // 显示cookie在控制台中
    console.log(request.data);

    var cookies = request.data;
    if (cookies && cookies.length > 0) {
      // 将cookie转换为字符串
      var cookieString = cookies
        .map(function (cookie) {
          return cookie.name + "=" + cookie.value;
        })
        .join("; ");

      // 将cookie字符串复制到剪贴板
      copyToClipboard(cookieString);
      urlInput.value = cookieString;
    } else {
      alert("No cookies found");
      urlInput.value = "cookieString";
    }
  }
});
