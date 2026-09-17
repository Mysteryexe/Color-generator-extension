# Color Generator

A Manifest V2 browser extension that generates a random color and presents its RGB value, hexadecimal value, and color name in a compact popup. It is designed to help designers and developers quickly explore matching colors.

## Features

- Generate a new random RGB color.
- Show the RGB and hexadecimal representations.
- Copy either representation to the clipboard.
- Resolve a local color name with the bundled Name That Color (`ntc`) data.
- Look up a larger palette name through `api.color.pizza`; if the network request fails, fall back to the local name and show an offline notice.
- Save the most recently generated color and favorite RGB values with `chrome.storage.local`.
- Reopen and select saved favorites.
- Open a related Stocksy color-search link.
- Adjust the popup's contrast treatment for light and dark colors.

The popup is fixed at 337 × 442 pixels and uses the bundled SVG icons and CSS. `tinycolor.js` supplies the light/dark color check.

## Install for development

1. Clone or download this repository.
2. Open `chrome://extensions` in Chromium-based browser.
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose the repository directory.
5. Open the extension popup from the browser toolbar.

The extension declares only the `storage` permission. The color-name lookup uses a network request to `api.color.pizza`, and the related-images link opens Stocksy when selected.

## Project files

- `manifest.json` — Manifest V2 metadata, icons, storage permission, and popup entry point.
- `index.html` / `style.css` — popup markup and layout.
- `popup.js` — generation, naming, persistence, contrast, clipboard, and network fallback logic.
- `fav.js` — favorite color storage and selection UI.
- `info.js` — information panel controls.
- `ntc.js` / `tinycolor.js` — bundled color utilities/data.
- `content/` — UI SVG icons.

## Limitations

The repository contains no automated tests, build tooling, CI workflow, or license file. The manifest is version 2, which may not be accepted by current browser releases as Manifest V2 support is phased out; updating the extension will require a deliberate migration and verification of the APIs used here.
