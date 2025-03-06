(function() {
  // Default settings
  let settings = {
    targetBranch: 'develop'
  };

  // Load settings first
  function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get({ targetBranch: 'develop' }, (items) => {
        settings.targetBranch = items.targetBranch;
        resolve();
      });
    });
  }

  // Function to check if we're on a PR page with the specific branch
  function checkForPullRequestPage() {
    // Check if we're on a PR page
    if (window.location.href.includes('/pull/')) {
      // Look for the branch element
      setTimeout(() => {
        const branchElements = document.querySelectorAll(`.base-ref a.no-underline[title*=":${settings.targetBranch}"]`);

        if (branchElements.length > 0) {
          const observer = new MutationObserver((mutations, obs) => {
            const mergeButton = document.querySelector('.prc-Button-Label-pTQ3x');
            if (mergeButton) {
              modifyMergeButton();
              obs.disconnect(); // Stop observing once we've found and modified the button
            }
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }, 500);
    }
  }

  // Function to modify the merge button to use squash merge by default
  function modifyMergeButton() {
    // Look for the merge button
    const mergeButton = document.querySelector('.d-flex.flex-items-start.flex-sm-items-center.flex-column.flex-sm-row.gap-2 div.flex-self-stretch.flex-shrink-0');

    if (mergeButton && mergeButton.textContent.includes('Merge pull request')) {
      // Find the dropdown button for merge options
      const dropdownButton = document.querySelector('[aria-label="Select merge method"]');

      if (dropdownButton) {
        // Simulate click on the dropdown to open it
        dropdownButton.click();

        // Small delay to allow dropdown to open
        setTimeout(() => {
          // Look for the Squash merge option and click it
          const options = document.querySelectorAll('ul[role="menu"] [role="menuitemradio"]');
          for (const option of options) {
            if (option.textContent.includes('Squash and merge')) {
              option.click();
              break;
            }
          }
        }, 300);
      }
    }
  }

  // Initial check when the page loads
  async function initialize() {
    await loadSettings();
    checkForPullRequestPage();
  }

  // Run the initialization
  initialize();

  // Also run when navigating between pages without a full reload (GitHub is a SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      initialize();
    }
  }).observe(document, { subtree: true, childList: true });

  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.targetBranch) {
      settings.targetBranch = changes.targetBranch.newValue;
      // Re-check the page with new settings
      checkForPullRequestPage();
    }
  });
})();
