
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanUrl") {
    console.log("[Background] Received scan request:", request.url);

    fetch(`https://malicious-scanner.p.rapidapi.com/rapid/url?url=${request.url}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "41425b3fbemsh26fdeaccf1c7ce9p153dacjsn62e1fb90e609",
        "x-rapidapi-host": "malicious-scanner.p.rapidapi.com",
      },
    })
    .then((response) => { 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => { 
        console.log("[Background] Scan Result:", data);
        sendResponse({ success: true, data: data });
      })
      .catch((error) => {
        console.error("[Background] Fetch error:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  }
});