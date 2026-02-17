function extractCode() {
  const textarea = document.querySelector("textarea");
  if (textarea && textarea.value.trim()) {
    return textarea.value;
  }

  const lines = document.querySelectorAll(".view-lines div");
  if (lines.length > 0) {
    return Array.from(lines).map(l => l.innerText).join("\n");
  }

  const editable = document.querySelector('[contenteditable="true"]');
  if (editable && editable.innerText.trim()) {
    return editable.innerText;
  }

  return null;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "GET_CODE") {
    sendResponse({ code: extractCode() });
  }
});
