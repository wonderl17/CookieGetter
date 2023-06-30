const button = document.querySelector("#btn");
const res = document.querySelector("#res");
const urlInput = document.querySelector("#urlInput");
console.log(button);

function copyToClipboard(text) {
  var input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

button.addEventListener("click", () => {
  const url = urlInput.value;
  urlInput.value = "";
  chrome.runtime.sendMessage({ action: "getCookie", url: url });
});

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
      res.innerHTML = cookieString;
    } else {
      res.innerHTML = "No cookies found";
    }
  }
});
