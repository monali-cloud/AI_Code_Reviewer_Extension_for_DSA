document.getElementById("reviewBtn").addEventListener("click", async () => {
  const codeBox = document.getElementById("codeBox");
  const reviewBox = document.getElementById("reviewBox");

  codeBox.textContent = "Fetching code...";
  reviewBox.textContent = "AI is reviewing your solution...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 1) Get code from content.js
  chrome.tabs.sendMessage(tab.id, { action: "GET_CODE" }, (res) => {

    if (chrome.runtime.lastError) {
      codeBox.textContent = "❌ Content script not responding";
      reviewBox.textContent = chrome.runtime.lastError.message;
      return;
    }

    if (!res || !res.code) {
      codeBox.textContent = "❌ No code found";
      reviewBox.textContent = "Click inside editor and try again.";
      return;
    }

    codeBox.textContent = res.code;

    // 2) Send code to background.js
    chrome.runtime.sendMessage(
      {
        action: "REVIEW_CODE",
        code: res.code
      },
      (response) => {

        if (chrome.runtime.lastError) {
          reviewBox.textContent = "❌ Background not responding\n" + chrome.runtime.lastError.message;
          return;
        }

        if (!response || !response.review) {
          reviewBox.textContent = "❌ No review received from background";
          return;
        }

        reviewBox.textContent = response.review;
      }
    );
  });
});
