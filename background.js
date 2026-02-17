console.log("🟢 Background service worker started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "REVIEW_CODE") {
    const code = message.code || "";

    let review = "";

    // ---------- ANALYSIS FLAGS ----------
    const hasMultipleLoops = (code.match(/for\s*\(|while\s*\(/g) || []).length > 1;
    const hasSingleLoop = (code.match(/for\s*\(|while\s*\(/g) || []).length === 1;
    const usesExtraArray = /vector|array|map|set|unordered_map/.test(code);
    const usesPrefix = /prefix/i.test(code);
    const usesSuffix = /suffix/i.test(code);
    const hasFunctions = /function|\w+\s*\(/g.test(code);
    const hasComments = /\/\//.test(code);
    const longVariables = /[a-zA-Z]{15,}/.test(code);

    // ---------- OPTIMIZATION ----------
    review += "🚀 Optimization Tips:\n";

    if (usesPrefix && usesSuffix) {
      review += "• Prefix and suffix arrays detected → memory can be optimized using in-place computation\n";
    }

    if (hasMultipleLoops) {
      review += "• Multiple loops detected → consider merging loops if logic allows\n";
    }

    if (usesExtraArray) {
      review += "• Extra data structures used → check if problem can be solved in-place\n";
    }

    if (!hasMultipleLoops && !usesExtraArray && !usesPrefix && !usesSuffix) {
      review += "• Current structure is already optimized for this approach\n";
    }

    review += "\n";

    // ---------- CLEAN CODE ----------
    review += "🧹 Cleaner Approach:\n";

    if (!hasComments) {
      review += "• Add comments to explain logic blocks\n";
    }

    if (longVariables) {
      review += "• Variable names are too long → improve readability\n";
    }

    if (!hasFunctions) {
      review += "• Consider modularizing logic into helper functions\n";
    }

    review += "• Maintain consistent indentation\n";
    review += "• Group related logic together\n\n";

    // ---------- INTERVIEW FEEDBACK ----------
    review += "🎯 Interview Feedback:\n";

    if (usesPrefix && usesSuffix) {
      review += "• Good use of prefix–suffix technique\n";
      review += "• Be ready to explain why division is not used\n";
    }

    if (hasSingleLoop) {
      review += "• Clearly explain loop invariant in interview\n";
    }

    if (hasMultipleLoops) {
      review += "• Justify multiple passes through data\n";
    }

    review += "• Explain edge cases (empty input, single element)\n";
    review += "• Compare with brute-force approach\n";
    review += "• State trade-offs clearly\n";

    sendResponse({ review });
    return true;
  }
});
