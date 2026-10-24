# CCGT-Assistant
An Obsidian plugin to support Critical-Constructivist Grounded Theory analysis and coding.

CCGT ASSISTANT 0.3.1
=====================

OVERVIEW
--------
CCGT Assistant provides workflow tools for Critical-Constructivist Grounded
Theory work in Obsidian. This package contains the currently supplied plugin
build, including its current Canvas colour behaviour. This also works with
other plugins, including Advanced Canvas and Canvas Format Brush.

FEATURES
--------
- Meaning Units: create and manage Meaning Units associated with transcript
  passages.
- Transcript labels: inserts bold, square-bracketed Meaning Unit labels next
  to the selected transcript passage.
- Transcript organisation: new blank notes created directly in the configured
  CCGT Interviews folder receive created/updated properties and the default
  headings Notes, Meaning Units, and Transcript.
- Memo setup: new notes created in the configured CCGT Memos folder receive
  created/updated properties and prompt for memo categories.
- Memo categories: supports Coding, Theoretical, and Operational categories.
  Selected categories are appended to the memo filename using em-dash
  separators (for example: "Memo title — Coding — Theoretical").
- Canvas colour handling: native Obsidian Canvas node colours are left to
  Obsidian rather than being overridden by CCGT inline card styling.
- Canvas connection colours: retains the plugin's Canvas connection-colour
  synchronisation functionality.

INSTALLATION
------------
1. Back up your vault before installing or replacing a plugin.
2. Extract this ZIP archive.
3. Copy the entire CCGT-Assistant folder into your vault's:
      .obsidian/plugins/
   The resulting folder should be:
      .obsidian/plugins/CCGT-Assistant/
4. Confirm that the folder contains main.js, manifest.json, and styles.css.
5. In Obsidian, open Settings > Community plugins.
6. Enable CCGT Assistant. If it is already enabled, disable and re-enable it
   or reload Obsidian so the updated plugin code is loaded.

UPDATING AN EXISTING INSTALLATION
---------------------------------
1. Quit Obsidian before replacing plugin files.
2. Make a backup copy of your existing CCGT-Assistant plugin folder.
3. Replace the contents of .obsidian/plugins/CCGT-Assistant/ with the
   contents of the CCGT-Assistant folder in this archive.
4. Reopen Obsidian and reload or disable/re-enable the plugin.
5. Test the workflows you use, including Meaning Unit creation, transcript
   labels and highlighting, memo creation, and Canvas connections.

IMPORTANT NOTES
---------------
- This ZIP packages the supplied installed plugin build. It is not the
  original TypeScript source project or a rebuildable development repository.
- Do not copy the backup plugin folders into .obsidian/plugins/. Only the
  CCGT-Assistant folder from this archive should be installed there.
- Canvas node colours are controlled using Obsidian's native Canvas colour
  menu. If you have older Canvas cards with stale inline styling, inspect and
  back up the relevant Canvas before manually changing its data.
- Feature availability and behaviour depend on the plugin build and the
  configuration in your vault. Back up your vault before upgrades.
- The minimum Obsidian version declared by this plugin is 1.10.0.

PACKAGE CONTENTS
----------------
CCGT-Assistant/
  main.js       Compiled plugin code
  manifest.json Plugin metadata (version 0.3.1)
  styles.css    Plugin styles
  INSTALL.txt   Brief installation notes
  README.txt    This guide

Version: 0.3.1
Plugin ID: ccgt-assistant
