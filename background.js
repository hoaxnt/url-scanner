chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanUrl") {
    console.log("[Background] Received scan request:", request.url);

    fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": "5fa5057d2082c3016151e34e10ab2062190826b98b5b40bc1b179c825e622513", // <<-- Make sure you replace this
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(request.url)}`,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("[Background] VirusTotal data:", data);
        sendResponse({ success: true, data: data });
      })
      .catch((error) => {
        console.error("[Background] Fetch error:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; 
  }
});
