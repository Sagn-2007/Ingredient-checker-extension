chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "scan-ingredients",
    title: "Scan ingredients from this image",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "scan-ingredients") {
    // Save the image URL so the popup can read it
    chrome.storage.local.set({ pendingImageScan: info.srcUrl }, () => {
      // Notify the user to open the popup
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Image Captured',
        message: 'Click the Ingredient Checker extension icon in the toolbar to run the scan!'
      });
    });
  }
});
