// document.getElementById('scanBtn').addEventListener('click', () => {
//   const url = document.getElementById('urlInput').value.trim();
//   const resultDiv = document.getElementById('result');
//   const loadingDiv = document.getElementById('loading');

//   if (!url) {
//     resultDiv.innerHTML = `<span style="color:red;">⚠️ Please enter a URL.</span>`;
//     return;
//   }

//   resultDiv.innerHTML = "";
//   loadingDiv.style.display = "block";

//   chrome.runtime.sendMessage({ action: "scanUrl", url }, (response) => {
//     loadingDiv.style.display = "none";

//     if (response.success) {
//       const stats = response.data.data.attributes.stats;
//       resultDiv.innerHTML = `
//         ✅ Harmless: ${stats.harmless}<br>
//         ⚠️ Malicious: ${stats.malicious}<br>
//         ❓ Suspicious: ${stats.suspicious}<br>
//         🧪 Undetected: ${stats.undetected}
//       `;
//     } else {
//       resultDiv.innerHTML = `<span style="color:red;">❌ Error: ${response.error}</span>`;
//     }
//   });
// });
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
      console.log("Scan success:", response.data);
      // You can display result here!
    } else {
      console.error("Scan failed:", response.error);
    }
  });
});
