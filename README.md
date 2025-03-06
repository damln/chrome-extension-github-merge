# GitHub PR Merge Button Customizer

A Chrome extension that automatically changes the default merge option to "Squash and merge" for GitHub pull requests targeting a specific branch.

## Features

- Automatically selects the "Squash and merge" option when opening pull requests that target your specified branch
- Configurable target branch name
- Works with GitHub's new UI
- Continues working as you navigate through GitHub without requiring page refresh

## Installation

### From Chrome Web Store (Recommended)

1. Navigate to the Chrome Web Store (link to be added when published)
2. Click "Add to Chrome"
3. Confirm the installation when prompted

### Manual Installation (Developer Mode)

1. Download or clone this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top-right corner
4. Click "Load unpacked"
5. Select the directory containing the extension files
6. The extension should now be installed and active

## Usage

After installation:

1. The extension will automatically run on any GitHub pull request pages
2. When you open a pull request that targets your specified branch (default is "develop"), the extension will automatically select "Squash and merge" as the merge option
3. No manual intervention is required - the extension handles this automatically whenever you view an eligible pull request

## Configuration

### Changing the Target Branch

By default, the extension looks for pull requests targeting the "develop" branch. To change this:

1. Click on the extension icon in your Chrome toolbar
2. Click on the "Options" or "Extension options" link
3. In the settings page, enter your desired target branch name
   - Note: Enter only the branch name without the colon (e.g., "main" not ":main")
4. Click "Save"
5. The new settings will take effect immediately for any open GitHub tabs

## How It Works

The extension:

1. Monitors GitHub pages for pull request views
2. Checks if the target branch matches your configured branch
3. When a match is found, it automatically clicks the merge method dropdown and selects "Squash and merge"
4. This change happens immediately when the page loads

## Troubleshooting

If the extension doesn't appear to be working:

1. Ensure you're viewing a pull request that targets your specified branch
2. Verify the extension is enabled in Chrome's extension settings
3. Try refreshing the page
4. Check if GitHub's UI has changed (the extension relies on specific CSS selectors)

## Contributing

Contributions to improve the extension are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Privacy

This extension:
- Does not collect any user data
- Does not transmit any information to external servers
- Only requires permissions to run on GitHub.com
- Only stores your target branch name preference in Chrome's sync storage
