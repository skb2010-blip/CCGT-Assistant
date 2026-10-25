# CCGT Assistant

**Version:** 0.3.6  
**Plugin ID:** `ccgt-assistant`  
**Minimum Obsidian version declared by the manifest:** 1.10.0  
**Package type:** Compiled Obsidian plugin distribution

CCGT Assistant provides tools for organising a Critical-Constructivist Grounded Theory (CCGT) research workflow in [Obsidian](https://obsidian.md/). It brings together interview-note setup, Meaning Unit capture and colour coding, memo categorisation, and Canvas card/connection colour tools.

> **Build and compatibility note:** This repository package contains the compiled plugin files (`main.js`, `manifest.json`, and `styles.css`), not the original TypeScript source project or build configuration. The features below describe the behaviour represented in this package. Canvas internals can change between Obsidian releases; test with a backup of your vault before relying on the plugin in a production research workflow.

## Contents

- [Features](#features)
- [Installation](#installation)
- [First-use workflow](#first-use-workflow)
- [Commands and entry points](#commands-and-entry-points)
- [Default folders and files](#default-folders-and-files)
- [Canvas colour tools](#canvas-colour-tools)
- [Meaning Units](#meaning-units)
- [Interview notes](#interview-notes)
- [Memo categories](#memo-categories)
- [Data handling and privacy](#data-handling-and-privacy)
- [Troubleshooting](#troubleshooting)
- [Known limitations](#known-limitations)
- [Package contents](#package-contents)

## Features

### 1. Meaning Unit capture

CCGT Assistant supports capturing a selected passage from an interview transcript as a Meaning Unit. The workflow allows the researcher to provide a label and colour information, then stores the Meaning Unit using the configured data file. Meaning Unit content can be represented in the interview note and added to a dedicated Meaning Units Canvas.

The plugin also provides a **Change Meaning Unit Colour** command for changing the colour associated with a Meaning Unit. Transcript rendering uses the stored Meaning Unit information to display the relevant colour treatment. Canvas card colours remain controlled through the Canvas colour tools rather than being automatically overwritten by Meaning Unit transcript styling.

### 2. Interview note setup

When a new Markdown note is created directly inside the configured Interviews folder, the plugin adds `created` and `updated` frontmatter properties if they are missing. If the new note is blank, it prepares the following structure:

- `Notes`
- `Meaning Units`
- `Transcript`

The Transcript section includes a prompt to paste or type the interview transcript. Existing non-blank note content is not intentionally replaced with the blank-note template.

### 3. New Interview command

The **New Interview** command creates an interview note through a prompt-based workflow. It uses the configured Interviews folder and the plugin's interview template conventions. The plugin checks for an existing path before creating a note with the same name.

### 4. Memo setup and categorisation

When a new Markdown note is created directly in the configured Memos folder, the plugin adds `created` and `updated` frontmatter properties if they are missing. If that new memo is the active file, a category dialog offers:

- **Coding**
- **Theoretical**
- **Operational**

One or more categories can be selected. When applied, the chosen categories are appended to the filename using em-dash separators. For example:

`Memo title — Coding — Theoretical.md`

The dialog also offers a way to skip categorisation. A rename can fail if a file with the target name already exists or the file cannot be renamed.

### 5. Card-anchored Canvas colour toolbar

When a Canvas is active, CCGT Assistant attaches a colour toolbar intended to sit near the selected Canvas card or cards. The toolbar supports applying a colour to multiple selected cards.

The integrated toolbar includes:

- Obsidian's native Canvas colour values `0` through `6`.
- An expandable set of pencil swatches.
- A custom colour picker.
- HEX and RGB fields.
- A saturation/brightness colour square and a single wide hue slider.
- An **Apply Colour** button whose background reflects the selected colour and whose text colour is chosen for contrast.
- Outside-click closing for the custom picker.

The toolbar is part of the plugin package; no Developer Tools console script is intended to be necessary for normal use.

### 6. Standalone Canvas Colour Pencil

The **Canvas Colour Pencil** can be opened from the plugin's ribbon icon or command palette. It provides a separate colour-selection dialog with built-in swatches and custom colour input for selected Canvas cards.

### 7. Canvas connection-colour synchronisation

The plugin observes Canvas changes and includes logic to synchronise a connection's colour with the colour of its destination node. This behaviour is intended to help visually associate a connection with the node it points to. It is separate from the custom card-colour toolbar.

Because this behaviour interacts with Obsidian Canvas internals, check your Canvas after changing node colours and connections. The plugin does not intentionally change Canvas connection direction or arrowhead defaults.

### 8. Folder setup

On startup, the plugin ensures that its expected CCGT folders exist. The defaults are listed below. Paths are vault-relative and can be changed in the plugin's settings/configuration if the installed build exposes those settings; this packaged build uses the default values shown here.

## Installation

### Install from a GitHub ZIP

1. Download the repository ZIP or the release ZIP containing the `CCGT-Assistant` folder.
2. Extract the ZIP.
3. In your vault, locate `.obsidian/plugins/`.
4. Copy the **`CCGT-Assistant`** folder into `.obsidian/plugins/`, so the final paths include:

   ```text
   <vault>/.obsidian/plugins/CCGT-Assistant/manifest.json
   <vault>/.obsidian/plugins/CCGT-Assistant/main.js
   <vault>/.obsidian/plugins/CCGT-Assistant/styles.css
   ```

5. In Obsidian, open **Settings → Community plugins**.
6. Enable **CCGT Assistant**. If replacing an existing installation, disable it before copying the new files, then re-enable it or reload Obsidian.

Do not copy the outer repository folder into the plugin folder if that creates an extra nested directory such as `CCGT-Assistant/CCGT-Assistant/main.js`. `manifest.json` must be directly inside the installed `CCGT-Assistant` folder.

### Update an existing installation

1. Back up the existing `.obsidian/plugins/CCGT-Assistant/` folder.
2. Disable the plugin in Obsidian.
3. Replace the plugin files with the new release's files.
4. Re-enable the plugin or reload Obsidian.
5. Open a Canvas and test the colour toolbar before using it on important research material.

## First-use workflow

1. Open or create an interview note in `CCGT/CCGT Interviews`.
2. Add the transcript under the `Transcript` heading.
3. Select a passage to analyse.
4. Run **Add Meaning Unit** from the command palette and complete the Meaning Unit form.
5. Give the Meaning Unit a descriptive label and choose its colour.
6. Review the resulting Meaning Unit information and the dedicated Meaning Units Canvas.
7. Create memos in `CCGT/CCGT Memos` and assign one or more memo categories when prompted.
8. Use Canvas to organise related research notes. Select one or more cards and use the card-anchored toolbar or Canvas Colour Pencil to apply colours.

## Commands and entry points

Search the Obsidian command palette for these commands:

| Command | Purpose |
|---|---|
| **Add Meaning Unit** | Starts the Meaning Unit workflow for selected interview text. |
| **New Interview** | Prompts for an interview name and creates an interview note. |
| **Change Meaning Unit Colour** | Changes the colour associated with a Meaning Unit. |
| **Canvas Colour Pencil: choose colour for selected cards** | Opens the standalone Canvas colour dialog for selected cards. |

The Canvas Colour Pencil is also available through a ribbon icon. The card-anchored toolbar appears in the Canvas context when selection is detected. Some commands require an active Markdown note or Canvas and a valid selection.

## Default folders and files

| Purpose | Default path |
|---|---|
| Interview notes | `CCGT/CCGT Interviews/` |
| Memos | `CCGT/CCGT Memos/` |
| Categories | `CCGT/CCGT Categories/` |
| Canvases | `CCGT/CCGT Canvases/` |
| Meaning Unit data | `CCGT/CCGT Canvases/Meaning Units.json` |
| Meaning Units Canvas | `CCGT/CCGT Canvases/Meaning Units.canvas` |
| Interview template convention | `CCGT/CCGT Interviews/Interview Transcript Template.md` |

The plugin creates the expected folders when it loads. The Meaning Units JSON and Canvas are used by the Meaning Unit workflow; they may be created when needed.

## Canvas colour tools

### Apply a native colour

1. Open a Canvas.
2. Select one or more cards (not connection lines).
3. Use the card-anchored toolbar and choose one of the native colour options, or open Canvas Colour Pencil from the ribbon/command palette.

### Apply a custom colour

1. Open the custom picker from the card-anchored toolbar.
2. Choose a colour in the saturation/brightness square and adjust the hue slider.
3. Optionally edit the HEX or RGB fields.
4. Review the Apply Colour button's preview.
5. Choose **Apply Colour** to apply the colour to the selected cards.

### Notes on selection and persistence

- Keep the intended cards selected while choosing a colour.
- The plugin filters Canvas connection edges out of card-colour application.
- The plugin asks Canvas to save or refresh after successful changes where supported by the Canvas API.
- Obsidian's Canvas APIs are not a stable public extension surface in every release; behaviour may vary by Obsidian version.

## Meaning Units

A Meaning Unit is a labelled piece of selected interview text used in the research workflow. The plugin's Meaning Unit form captures the selection and provides fields for labelling and colour selection. The workflow stores the data in the configured Meaning Units JSON file and associates Meaning Units with the relevant interview content. The plugin includes transcript/live-preview rendering support and a command for changing a Meaning Unit's colour.

For best results, select the intended transcript passage before starting the command. If the plugin reports that no text is selected, return to the interview note, highlight the passage, and run **Add Meaning Unit** again.

## Interview notes

Interview notes are expected to be Markdown files located directly in the configured Interviews folder. Blank new notes are populated with the default headings. The plugin adds `created` and `updated` frontmatter fields if they do not already exist. The timestamps are generated when the plugin processes the newly created note; they should not be treated as a complete audit history.

## Memo categories

Memo categories are stored in the filename rather than as a separate metadata field in this workflow. Multiple selected categories are appended in the order shown in the category dialog. If the memo category dialog is skipped, the memo remains without a category suffix. If a target filename already exists, the rename may fail; choose a different memo title or resolve the filename conflict and retry.

## Data handling and privacy

- The plugin works with files and Canvas data inside the current Obsidian vault.
- The packaged code does not advertise a remote account, cloud service, or external data upload feature.
- Research notes, transcripts, Meaning Units, and memos should still be treated as sensitive local research data. Follow your institution's ethics, consent, storage, and backup requirements.
- Back up the vault before installing updates or using the plugin on important research data.

## Troubleshooting

### Plugin does not appear or load

- Check that the installed folder is exactly `.obsidian/plugins/CCGT-Assistant/`.
- Confirm `manifest.json`, `main.js`, and `styles.css` are directly inside that folder.
- Check that the installed Obsidian version meets the manifest's minimum version declaration.
- Open **Settings → Community plugins** and enable the plugin.
- If it still fails, inspect Obsidian's Developer Console for the first plugin error.

### Toolbar does not appear

- Open a Canvas view and select one or more cards.
- Click the Canvas area once, then reselect the cards.
- Reload Obsidian or disable and re-enable CCGT Assistant.
- Confirm the plugin is installed only once in the vault.

### Colour is not applied

- Ensure a Canvas is active and at least one card (not an edge) is selected.
- Try one card first to distinguish a selection issue from a multi-selection issue.
- Check the Developer Console for Canvas API errors.
- If custom colours behave differently from native colours, note the Obsidian version and exact steps before reporting the issue.

### Meaning Unit command says no text is selected

- Open a Markdown interview note in the configured Interviews folder.
- Select text in the transcript.
- Run **Add Meaning Unit** again.

### Memo category rename fails

- Check whether a file with the target category suffix already exists.
- Try a different memo title or remove conflicting category suffixes from the filename.

### Changes do not appear after updating

- Disable the plugin before replacing files.
- Verify that the new files were copied into the correct plugin directory, without an extra nested folder.
- Re-enable the plugin or reload Obsidian.

## Known limitations

- This ZIP is a compiled distribution and does not include the original TypeScript source files, automated tests, or build pipeline.
- The colour toolbar and connection synchronisation interact with Obsidian Canvas internals, which can change between Obsidian releases.
- The plugin has not been verified against every operating system, Obsidian version, or community-plugin combination.
- A syntax check of `main.js` confirms JavaScript parsing only; it does not replace testing inside Obsidian.
- The manifest does not restrict the plugin to desktop, but Canvas interactions and layout may differ across desktop and mobile.

## Package contents

- `main.js` — compiled plugin implementation.
- `manifest.json` — Obsidian plugin metadata.
- `styles.css` — plugin styling.
- `INSTALL.txt` — brief installation notes.
- `README.md` — feature and installation documentation.

## Contributing and issue reports

When reporting a problem, include:

- CCGT Assistant version.
- Obsidian version and operating system.
- The command or toolbar action used.
- The steps needed to reproduce the issue.
- Any relevant error from Obsidian's Developer Console, with personal or sensitive research content removed.

Do not include interview transcripts, participant identifiers, or other confidential research material in issue reports.
