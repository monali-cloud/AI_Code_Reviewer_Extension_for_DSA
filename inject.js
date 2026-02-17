console.log("🟣 inject.js loaded");

(function waitForMonaco() {
  const interval = setInterval(() => {
    if (window.monaco && window.monaco.editor) {
      console.log("🟣 Monaco detected");

      clearInterval(interval);

      const models = window.monaco.editor.getModels();
      const code = models.length ? models[0].getValue() : null;

      console.log("🟣 Extracted code:", code);

      window.postMessage(
        { source: "LC_AI_REVIEW", code },
        "*"
      );
    }
  }, 500); // check every 500ms until Monaco appears
})();
