// Listen for messages from the content or popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  // Check if the action is a 'scanUrl' request
  if (request.action === "scanUrl") {
    console.log("[Background] Received scan request:", request.url);

    // Perform a GET request to the malicious-scanner API with the provided URL
    fetch(`https://malicious-scanner.p.rapidapi.com/rapid/url?url=${request.url}`, {
      method: "GET",  // HTTP GET method
      headers: {
        "x-rapidapi-key": "41425b3fbemsh26fdeaccf1c7ce9p153dacjsn62e1fb90e609",  // API key for authorization
        "x-rapidapi-host": "malicious-scanner.p.rapidapi.com",  // Host for the API
      },
    })
    .then((response) => { 
        if (!response.ok) {
          // If there's an HTTP error, throw an error with the status code
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Convert the response to JSON for further processing
        return response.json();
      })
      // Once we have the data, send it back to the sender (popup/content script)
      .then((data) => { 
        console.log("[Background] Scan Result:", data);
        // Send success response with the scan data
        sendResponse({ success: true, data: data });
      })
      // If there's any error during the fetch or response handling, catch it
      .catch((error) => {
        console.error("[Background] Fetch error:", error);
        
        let message = error.message.includes("429")
        ? "Rate limit exceeded. Please try again later."
        : error.message;

        // Send failure response with the error message
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate we're using a response callback asynchronously
    return true;
  }
});
