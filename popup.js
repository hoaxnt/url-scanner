document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("scanBtn").addEventListener("click", () => {
    const url = document.getElementById("urlInput").value.trim();

    // Check if url is entered
    if (!url) { 
      alert("Please enter a URL!");
      return;
    }
   
    // Show loading indicator
    document.getElementById("loading").style.display = "block";
    document.getElementById("result-section").style.display = "none";

    chrome.runtime.sendMessage(
      { action: "scanUrl", url: encodeURIComponent(url)},
      (response) => {
       
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

          // Show result section
          document.getElementById("result-section").style.display = "block";
          console.log("Scan success:", data);
          document.getElementById("result-status").textContent = data.status;
          document.getElementById("result-details").textContent = data.message;
        } else {
          console.error("Scan failed:", response.error);
        }
      }
    );
  });
});
