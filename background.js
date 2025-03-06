chrome.runtime.onInstalled.addListener(() => {
  // Set default settings when the extension is installed
  chrome.storage.sync.get({ targetBranch: null }, (items) => {
    // Only set default if the setting doesn't exist yet
    if (items.targetBranch === null) {
      chrome.storage.sync.set({ targetBranch: 'develop' });
    }
  });
});
