document.getElementById("scanBtn").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value.trim();

  if (!url) {
    alert("Please enter a URL!");
    return;
  }

  chrome.runtime.sendMessage({ action: "scanUrl", url }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Runtime error:", chrome.runtime.lastError.message);
      return;
    }

    if (!response) {
      console.error("No response received.");
      return;
    }

    if (response.success) {
      let result = JSON.stringify(response.data, null, 2);
      console.log("Scan success:", response.data);

      document.getElementById("result").textContent = result.data;

    } else {
      console.error("Scan failed:", response.error);
    }
  });
});
