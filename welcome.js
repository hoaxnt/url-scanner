document.getElementById('agreeBtn').addEventListener('click', () => {
    chrome.storage.local.set({ agreed: true }, () => {
      chrome.action.setPopup({ popup: "popup.html" });
      window.close();
    });
  });
  