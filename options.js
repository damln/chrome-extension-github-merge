// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get UI elements
  const branchNameInput = document.getElementById('branchName');
  const saveButton = document.getElementById('save');
  const statusElement = document.getElementById('status');

  // Load saved settings
  chrome.storage.sync.get({ targetBranch: 'develop' }, (items) => {
    branchNameInput.value = items.targetBranch;
  });

  // Save settings when the save button is clicked
  saveButton.addEventListener('click', () => {
    // Get the branch name from the input field
    const targetBranch = branchNameInput.value.trim() || 'develop';

    // Save the settings
    chrome.storage.sync.set({ targetBranch }, () => {
      // Show success message
      statusElement.textContent = 'Settings saved!';
      statusElement.classList.add('success');

      // Hide the success message after 2 seconds
      setTimeout(() => {
        statusElement.classList.remove('success');
      }, 2000);
    });
  });
});
