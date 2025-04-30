document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("scanBtn").addEventListener("click", () => {
    const url = document.getElementById("urlInput").value.trim();

    if (!url) {
      alert("Please enter a URL!");
      return;
    }

    // Show loading indicator
    document.getElementById("loading").style.display = "block";
    document.getElementById("result-section").style.display = "none";

    chrome.runtime.sendMessage({ action: "scanUrl", url }, (response) => {
      // Hide loading
      document.getElementById("loading").style.display = "none";

      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
        return;
      }

      if (!response || !response.data || !response.data.data) {
        console.error("No valid response received.");
        return;
      }

      if (response.success) {
        const data = response.data.data;

        // Fill in result elements
        document.getElementById("result-type").textContent = data.type;
        document.getElementById("result-id").textContent = data.id;
        document.getElementById("result-link").href = data.links.self;

        // Show result section
        document.getElementById("result-section").style.display = "block";
        console.log("Scan success:", data);

      } else {
        console.error("Scan failed:", response.error);
      }
    });
  });
});
