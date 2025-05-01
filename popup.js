// Wait until the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

  // Add an event listener to the scan button to start the scanning process when clicked
  document.getElementById("scanBtn").addEventListener("click", () => {
    
    // Get the URL entered by the user and trim any extra spaces
    const url = document.getElementById("urlInput").value.trim();

    // Check if the user entered a URL, if not, show an alert and stop further execution
    if (!url) { 
      alert("Please enter a URL!");  // Show alert if no URL is entered
      return;  // Exit the function
    }

    // Show the loading indicator and hide the result section (while waiting for the scan)
    document.getElementById("loading").style.display = "block";
    document.getElementById("result-section").style.display = "none";

    // Send a message to the background script to perform the URL scan
    chrome.runtime.sendMessage(
      { action: "scanUrl", url: encodeURIComponent(url) }, // Send URL after encoding it
      (response) => {  // Callback to handle the response from the background script
        
        // Hide the loading indicator once the scan is complete
        document.getElementById("loading").style.display = "none";

        // Check if there's a runtime error (e.g., in case the background script fails)
        if (chrome.runtime.lastError) {
          console.error("Runtime error:", chrome.runtime.lastError.message);
          return;
        }

        // Check if the response or response data is invalid
        if (!response || !response.data || !response.data.data) {
          console.error("No valid response received.");
          return;
        }

        // If the scan was successful, display the results
        if (response.success) {
          const data = response.data.data;  // Extract data from the response
          
          // Show the result section with scan information
          document.getElementById("result-section").style.display = "block";
          console.log("Scan success:", data);  // Log scan result to the console
          
          // Display the scan result status and details
          if (response.success) {
            const data = response.data.data;
            
            // Change status color dynamically based on result
            const statusElement = document.getElementById("result-status");
            if (data.status === "safe") {
              statusElement.style.color = "green";
              statusElement.textContent = "Safe";
            } else if (data.status === "dangerous") {
              statusElement.style.color = "red";
              statusElement.textContent = "Dangerous";
            } else {
              statusElement.style.color = "orange";
              statusElement.textContent = "Unknown";
            }
          }
          
          document.getElementById("result-details").textContent = data.message;
        } else {
          // If the scan failed, log the error message
          console.error("Scan failed:", response.error);
        }
      }
    );
  });
});
