console.log("background");

// const
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { action, url } = request;
  // 如果消息是来自popup页面的请求获取cookie的消息
  if (action === "getCookie") {
    console.log(chrome.cookies);
    // 获取指定接口的cookie
    chrome.cookies.getAll({ url }, function (cookie) {
      // 将cookie发送回popup页面
      console.log(cookie);
      chrome.runtime.sendMessage({ action: "cookie", data: cookie });
    });
  }
});
