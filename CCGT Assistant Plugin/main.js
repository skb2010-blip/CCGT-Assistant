var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CcgtAssistantPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian12 = require("obsidian");

// src/commands/meaning-unit-creator-view.ts
var import_obsidian5 = require("obsidian");

// src/shared/validation.ts
var import_obsidian = require("obsidian");
function getActiveEditor(app) {
  const activeView = app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
  if (!(activeView == null ? void 0 : activeView.editor) || !activeView.file) {
    new import_obsidian.Notice("CCGT Assistant: No active Markdown file.");
    return null;
  }
  return {
    editor: activeView.editor,
    file: activeView.file
  };
}
function fileIsInFolder(file, folderPath) {
  const normalizedFolder = folderPath.replace(/\/+$/, "");
  if (!normalizedFolder) {
    return true;
  }
  return file.path === normalizedFolder || file.path.startsWith(`${normalizedFolder}/`);
}
function validateInterviewFile(app, interviewsFolder) {
  const active = getActiveEditor(app);
  if (!active) {
    return null;
  }
  if (!fileIsInFolder(active.file, interviewsFolder)) {
    new import_obsidian.Notice(
      `CCGT Assistant: This command can only be used in the Interviews folder: ${interviewsFolder}`
    );
    return null;
  }
  return active;
}

// src/commands/add-meaning-unit.ts
var import_obsidian4 = require("obsidian");

// src/shared/modals.ts
var import_obsidian2 = require("obsidian");

// src/meaning-units/meaning-unit-colours.ts
var MEANING_UNIT_COLOURS = {
  red: {
    light: { family: "red", shade: "light", hex: "#FFB3B3", label: "Red \u2014 Light" },
    medium: { family: "red", shade: "medium", hex: "#FF6666", label: "Red \u2014 Medium" },
    dark: { family: "red", shade: "dark", hex: "#CC0000", label: "Red \u2014 Dark" }
  },
  orange: {
    light: { family: "orange", shade: "light", hex: "#FFD0A3", label: "Orange \u2014 Light" },
    medium: { family: "orange", shade: "medium", hex: "#FF9933", label: "Orange \u2014 Medium" },
    dark: { family: "orange", shade: "dark", hex: "#E67300", label: "Orange \u2014 Dark" }
  },
  yellow: {
    light: { family: "yellow", shade: "light", hex: "#FFF4B3", label: "Yellow \u2014 Light" },
    medium: { family: "yellow", shade: "medium", hex: "#FFD633", label: "Yellow \u2014 Medium" },
    dark: { family: "yellow", shade: "dark", hex: "#C9A800", label: "Yellow \u2014 Dark" }
  },
  green: {
    light: { family: "green", shade: "light", hex: "#BFE8BF", label: "Green \u2014 Light" },
    medium: { family: "green", shade: "medium", hex: "#66B266", label: "Green \u2014 Medium" },
    dark: { family: "green", shade: "dark", hex: "#267326", label: "Green \u2014 Dark" }
  },
  blue: {
    light: { family: "blue", shade: "light", hex: "#B3D9FF", label: "Blue \u2014 Light" },
    medium: { family: "blue", shade: "medium", hex: "#4D94FF", label: "Blue \u2014 Medium" },
    dark: { family: "blue", shade: "dark", hex: "#0052A3", label: "Blue \u2014 Dark" }
  },
  purple: {
    light: { family: "purple", shade: "light", hex: "#D8B3FF", label: "Purple \u2014 Light" },
    medium: { family: "purple", shade: "medium", hex: "#9966CC", label: "Purple \u2014 Medium" },
    dark: { family: "purple", shade: "dark", hex: "#663399", label: "Purple \u2014 Dark" }
  }
};

// src/shared/modals.ts
var MeaningUnitColourPickerModal = class extends import_obsidian2.Modal {
  constructor(app, initial) {
    super(app);
    this.submitted = false;
    this.selectedFamily = initial.colourFamily;
    this.selectedShade = initial.colourShade;
    this.selectedHex = initial.hex;
  }
  openAndWait() {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      this.open();
    });
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", {
      text: "Meaning Unit Colour"
    });
    this.renderColourPicker(contentEl);
    new import_obsidian2.Setting(contentEl).addButton((button) => {
      button.setButtonText("OK").setCta().onClick(() => {
        this.submitted = true;
        this.close();
      });
    }).addButton((button) => {
      button.setButtonText("Cancel").onClick(() => {
        this.submitted = false;
        this.close();
      });
    });
  }
  renderColourPicker(contentEl) {
    const colourSetting = new import_obsidian2.Setting(contentEl).setName("Colour").setDesc("Choose a colour family for this Meaning Unit.");
    const swatchContainer = colourSetting.controlEl.createDiv({
      cls: "ccgt-colour-swatches"
    });
    const families = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple"
    ];
    for (const family of families) {
      const colour = MEANING_UNIT_COLOURS[family][this.selectedShade];
      const swatch = swatchContainer.createEl("button", {
        cls: "ccgt-colour-swatch",
        attr: {
          type: "button",
          "aria-label": colour.label,
          title: colour.label
        }
      });
      swatch.style.backgroundColor = colour.hex;
      if (family === this.selectedFamily) {
        swatch.addClass("is-selected");
      }
      swatch.addEventListener("click", () => {
        this.selectedFamily = family;
        this.selectedHex = MEANING_UNIT_COLOURS[family][this.selectedShade].hex;
        this.renderShades();
        this.updatePreview();
      });
    }
    this.shadeContainerEl = contentEl.createDiv({
      cls: "ccgt-colour-shades"
    });
    this.renderShades();
    const customSetting = new import_obsidian2.Setting(contentEl).setName("Custom colour").setDesc("Choose any colour or enter a HEX value.");
    customSetting.addColorPicker((picker) => {
      picker.setValue(this.selectedHex).onChange((value) => {
        this.selectedHex = value;
        this.updatePreview();
      });
    });
    customSetting.addText((text) => {
      text.setValue(this.selectedHex).setPlaceholder("#FFF4B3").onChange((value) => {
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
          this.selectedHex = value;
          this.updatePreview();
        }
      });
    });
    const previewSetting = new import_obsidian2.Setting(contentEl).setName("Selected colour");
    this.colourPreviewEl = previewSetting.controlEl.createDiv({
      cls: "ccgt-colour-preview"
    });
    this.updatePreview();
  }
  renderShades() {
    if (!this.shadeContainerEl) {
      return;
    }
    this.shadeContainerEl.empty();
    const shadeTitle = this.shadeContainerEl.createEl("span", {
      cls: "ccgt-colour-shade-label",
      text: "Shade"
    });
    shadeTitle.setAttr("aria-hidden", "true");
    const shades = [
      "light",
      "medium",
      "dark"
    ];
    for (const shade of shades) {
      const colour = MEANING_UNIT_COLOURS[this.selectedFamily][shade];
      const button = this.shadeContainerEl.createEl("button", {
        cls: "ccgt-colour-shade",
        attr: {
          type: "button",
          "aria-label": colour.label,
          title: colour.label
        }
      });
      button.style.backgroundColor = colour.hex;
      if (shade === this.selectedShade) {
        button.addClass("is-selected");
      }
      button.addEventListener("click", () => {
        this.selectedShade = shade;
        this.selectedHex = colour.hex;
        this.renderShades();
        this.updatePreview();
      });
    }
  }
  updatePreview() {
    if (!this.colourPreviewEl) {
      return;
    }
    this.colourPreviewEl.style.backgroundColor = this.selectedHex;
    this.colourPreviewEl.setAttr(
      "aria-label",
      `Selected colour ${this.selectedHex}`
    );
  }
  onClose() {
    this.contentEl.empty();
    if (this.resolvePromise) {
      this.resolvePromise(
        this.submitted ? {
          colourFamily: this.selectedFamily,
          colourShade: this.selectedShade,
          hex: this.selectedHex
        } : null
      );
      this.resolvePromise = void 0;
    }
  }
};
var SimpleInputModal = class extends import_obsidian2.Modal {
  constructor(app, titleText, placeholderText = "") {
    super(app);
    this.titleText = titleText;
    this.placeholderText = placeholderText;
    this.result = "";
    this.submitted = false;
  }
  openAndWait() {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      this.open();
    });
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", {
      text: this.titleText
    });
    new import_obsidian2.Setting(contentEl).addText((text) => {
      text.setPlaceholder(this.placeholderText).onChange((value) => {
        var _a;
        this.result = value;
        (_a = this.confirmationButton) == null ? void 0 : _a.setDisabled(
          this.result.trim() === ""
        );
      });
      window.setTimeout(() => {
        text.inputEl.focus();
      }, 50);
    });
    new import_obsidian2.Setting(contentEl).addButton((button) => {
      this.confirmationButton = button.setButtonText("OK").setCta().setDisabled(true).onClick(() => {
        this.submitted = true;
        this.close();
      });
    }).addButton((button) => {
      button.setButtonText("Cancel").onClick(() => {
        this.result = "";
        this.submitted = false;
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
    if (this.resolvePromise) {
      this.resolvePromise(
        this.submitted ? this.result.trim() : ""
      );
      this.resolvePromise = void 0;
    }
  }
};

// src/shared/annotation.ts
var BLOCK_ID_REGEX = /\^[\w-]+$/;
function addHighlightMarkup(selection) {
  if (!selection) {
    return "";
  }
  return selection.replace(
    /^( ?)(.+?)( ?)$/s,
    "$1==$2==$3"
  );
}
function moveToLastLineOfParagraph(editor) {
  const cursor = editor.getCursor();
  let line = cursor.line;
  while (line < editor.lineCount() - 1) {
    const nextLine = editor.getLine(line + 1);
    if (nextLine.trim() === "") {
      break;
    }
    line++;
  }
  editor.setCursor({
    line,
    ch: editor.getLine(line).length
  });
  return line;
}
function prepareBlockId(editor) {
  const lineNumber = moveToLastLineOfParagraph(editor);
  const lineText = editor.getLine(lineNumber);
  const match = lineText.match(BLOCK_ID_REGEX);
  if (match) {
    const blockId = match[0];
    const lineWithoutId = lineText.slice(0, -blockId.length).trim();
    return {
      blockId,
      lineWithoutId
    };
  }
  const now = /* @__PURE__ */ new Date();
  const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}--${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
  return {
    blockId: `^id-${timestamp}`,
    lineWithoutId: lineText.trim()
  };
}

// src/meaning-units/meaning-unit-store.ts
var import_obsidian3 = require("obsidian");
async function loadMeaningUnitStore(app, dataFilePath) {
  const path = (0, import_obsidian3.normalizePath)(dataFilePath);
  const file = app.vault.getAbstractFileByPath(path);
  if (!(file instanceof import_obsidian3.TFile)) {
    return {};
  }
  try {
    const raw = await app.vault.read(file);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed;
  } catch (error) {
    console.error(
      "CCGT Assistant: Could not read Meaning Unit store:",
      error
    );
    return {};
  }
}
async function saveMeaningUnitStore(app, dataFilePath, store) {
  const path = (0, import_obsidian3.normalizePath)(dataFilePath);
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof import_obsidian3.TFile) {
    await app.vault.modify(
      existing,
      JSON.stringify(store, null, 2)
    );
    return;
  }
  await ensureParentFolder(app, path);
  await app.vault.create(
    path,
    JSON.stringify(store, null, 2)
  );
}
async function ensureParentFolder(app, filePath) {
  const lastSlash = filePath.lastIndexOf("/");
  if (lastSlash === -1) {
    return;
  }
  const folderPath = filePath.slice(0, lastSlash);
  if (!folderPath) {
    return;
  }
  const existing = app.vault.getAbstractFileByPath(folderPath);
  if (existing) {
    return;
  }
  await app.vault.createFolder(folderPath);
}

// src/commands/add-meaning-unit.ts
async function saveMeaningUnitFromSelection(app, settings, selection, draft) {
  const { editor, file, highlightedText, from, to } = selection;
  const meaningUnitId = `mu-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const annotatedSelection = `${addHighlightMarkup(highlightedText)} **[${draft.label.trim()}]**`;
  editor.replaceRange(annotatedSelection, from, to);
  editor.setCursor({ line: from.line, ch: from.ch + annotatedSelection.length });
  const { blockId, lineWithoutId } = prepareBlockId(editor);
  const lineNumber = editor.getCursor().line;
  const currentLine = editor.getLine(lineNumber);
  const updatedLine = `${lineWithoutId} ${blockId}`.trim();
  if (currentLine !== updatedLine) editor.setLine(lineNumber, updatedLine);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const meaningUnit = {
    meaningUnitId,
    blockId,
    label: draft.label.trim(),
    highlightedText,
    sourceFile: file.path,
    colourFamily: draft.colourFamily,
    colourShade: draft.colourShade,
    colourHex: draft.hex,
    created: now,
    updated: now
  };
  const store = await loadMeaningUnitStore(app, settings.meaningUnits.dataFile);
  store[meaningUnitId] = meaningUnit;
  await saveMeaningUnitStore(app, settings.meaningUnits.dataFile, store);
  await updateMeaningUnitsSection(app, file.path, meaningUnit);
  await addMeaningUnitToCanvas(app, settings.meaningUnits.dataFile, meaningUnit);
  new import_obsidian4.Notice(`CCGT Assistant: Meaning Unit "${draft.label.trim()}" added.`);
}
async function updateMeaningUnitsSection(app, filePath, meaningUnit) {
  const file = app.vault.getAbstractFileByPath(filePath);
  if (!(file instanceof import_obsidian4.TFile)) return;
  let content = await app.vault.read(file);
  const meaningUnitLine = `- [[${filePath}#${meaningUnit.blockId}|${meaningUnit.label}]]`;
  const meaningHeading = "## Meaning Units";
  const transcriptHeading = "## Transcript";

  // Keep the Meaning Units section above the transcript, matching the original template.
  let meaningStart = content.indexOf(meaningHeading);
  let transcriptStart = content.indexOf(transcriptHeading);
  if (meaningStart !== -1 && transcriptStart !== -1 && meaningStart > transcriptStart) {
    const sectionStart = meaningStart;
    let sectionEnd = content.indexOf("\n## ", sectionStart + meaningHeading.length);
    if (sectionEnd === -1) sectionEnd = content.length;
    const section = content.slice(sectionStart, sectionEnd).trim();
    content = (content.slice(0, sectionStart) + content.slice(sectionEnd)).trim();
    transcriptStart = content.indexOf(transcriptHeading);
    content = transcriptStart === -1
      ? `${section}\n\n${content}`
      : `${content.slice(0, transcriptStart).trimEnd()}\n\n${section}\n\n${content.slice(transcriptStart)}`;
  }

  meaningStart = content.indexOf(meaningHeading);
  transcriptStart = content.indexOf(transcriptHeading);
  if (meaningStart !== -1) {
    let sectionEnd = content.indexOf("\n## ", meaningStart + meaningHeading.length);
    if (sectionEnd === -1) sectionEnd = content.length;
    const section = content.slice(meaningStart, sectionEnd);
    if (!section.includes(meaningUnitLine)) {
      const updatedSection = `${section.trimEnd()}\n${meaningUnitLine}\n`;
      content = content.slice(0, meaningStart) + updatedSection + content.slice(sectionEnd);
    }
  } else {
    const section = `${meaningHeading}\n\n_No Meaning Units added yet._\n\n${meaningUnitLine}\n\n`;
    transcriptStart = content.indexOf(transcriptHeading);
    content = transcriptStart !== -1
      ? content.slice(0, transcriptStart) + section + content.slice(transcriptStart)
      : `${section}${content}`;
  }
  await app.vault.modify(file, content);
}

async function addMeaningUnitToCanvas(app, dataFilePath, meaningUnit) {
  void dataFilePath;
  const canvasFolder = "CCGT/CCGT Canvases";
  const canvasPath = `${canvasFolder}/Meaning Units.canvas`;
  const canvasColours = {
    red: {
      background: "#FFB3B3",
      border: "#CC0000",
      text: "#7A0000"
    },
    orange: {
      background: "#FFD0A3",
      border: "#E67300",
      text: "#7A3E00"
    },
    yellow: {
      background: "#FFF4B3",
      border: "#9A7B00",
      text: "#5C4800"
    },
    green: {
      background: "#BFE8BF",
      border: "#267326",
      text: "#174D17"
    },
    blue: {
      background: "#B3D9FF",
      border: "#0052A3",
      text: "#003B75"
    },
    purple: {
      background: "#D8B3FF",
      border: "#663399",
      text: "#47216F"
    }
  };
  const colours = canvasColours[meaningUnit.colourFamily] ?? canvasColours.blue;
  try {
    if (!app.vault.getAbstractFileByPath(
      canvasFolder
    )) {
      await app.vault.createFolder(
        canvasFolder
      );
    }
    const existing = app.vault.getAbstractFileByPath(
      canvasPath
    );
    const createNode = (index) => ({
      id: `ccgt-${meaningUnit.meaningUnitId}`,
      type: "text",
      text: `[[${meaningUnit.sourceFile}#${meaningUnit.blockId}|${meaningUnit.label}]]`,
      x: index % 4 * 400,
      y: Math.floor(index / 4) * 240,
      width: 360,
      height: 180,
      color: meaningUnit.colourHex || colours.background
    });
    if (!existing) {
      await app.vault.create(
        canvasPath,
        JSON.stringify(
          {
            nodes: [createNode(0)],
            edges: []
          },
          null,
          2
        )
      );
      return;
    }
    const raw = await app.vault.read(
      existing
    );
    let canvas;
    try {
      canvas = JSON.parse(raw);
    } catch {
      canvas = {
        nodes: [],
        edges: []
      };
    }
    if (!Array.isArray(canvas.nodes)) {
      canvas.nodes = [];
    }
    const alreadyExists = canvas.nodes.some(
      (item) => item.id === `ccgt-${meaningUnit.meaningUnitId}`
    );
    if (!alreadyExists) {
      canvas.nodes.push(
        createNode(canvas.nodes.length)
      );
    }
    await app.vault.modify(
      existing,
      JSON.stringify(
        canvas,
        null,
        2
      )
    );
  } catch (error) {
    console.error(
      "CCGT Assistant: Failed to create Meaning Units Canvas:",
      error
    );
    new import_obsidian4.Notice(
      "CCGT Assistant: Canvas creation failed. Check Developer Console."
    );
  }
}

// src/commands/meaning-unit-creator-view.ts
var MEANING_UNIT_CREATOR_VIEW = "ccgt-meaning-unit-creator";
var FAMILIES = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple"
];
var SHADES = [
  "light",
  "medium",
  "dark"
];
var HEX = {
  red: {
    light: "#FFB3B3",
    medium: "#FF6666",
    dark: "#CC0000"
  },
  orange: {
    light: "#FFD0A3",
    medium: "#FF9933",
    dark: "#E67300"
  },
  yellow: {
    light: "#FFF4B3",
    medium: "#FFD633",
    dark: "#C9A800"
  },
  green: {
    light: "#BFE8BF",
    medium: "#66B266",
    dark: "#267326"
  },
  blue: {
    light: "#B3D9FF",
    medium: "#4D94FF",
    dark: "#0052A3"
  },
  purple: {
    light: "#D8B3FF",
    medium: "#9966CC",
    dark: "#663399"
  }
};
var MeaningUnitCreatorView = class extends import_obsidian5.ItemView {
  constructor(leaf, app, settings) {
    super(leaf);
    this.selection = null;
    this.sourceEditor = null;
    this.sourceFile = null;
    this.lastSavedSignature = "";
    this.selectionChangeHandler = () => {
      this.captureCurrentSelection();
    };
    this.settings = settings;
  }
  getViewType() {
    return MEANING_UNIT_CREATOR_VIEW;
  }
  getDisplayText() {
    return "Create Meaning Unit";
  }
  getIcon() {
    return "highlighter";
  }
  async onOpen() {
    this.render();
    document.addEventListener(
      "selectionchange",
      this.selectionChangeHandler
    );
  }
  async onClose() {
    document.removeEventListener(
      "selectionchange",
      this.selectionChangeHandler
    );
  }
  setSelection(selection) {
    this.sourceEditor = selection.editor;
    this.sourceFile = selection.file;
    this.selection = selection;
    this.lastSavedSignature = "";
    this.renderSelectionPreview();
  }
  captureCurrentSelection() {
    if (!this.sourceEditor || !this.sourceFile) return;
    const highlightedText = this.sourceEditor.getSelection();
    if (!highlightedText.trim()) return;
    const from = this.sourceEditor.getCursor("from");
    const to = this.sourceEditor.getCursor("to");
    const signature = [
      this.sourceFile.path,
      from.line,
      from.ch,
      to.line,
      to.ch,
      highlightedText
    ].join("|");
    if (signature === this.lastSavedSignature) return;
    this.selection = {
      editor: this.sourceEditor,
      file: this.sourceFile,
      highlightedText,
      from,
      to
    };
    this.renderSelectionPreview();
  }
  render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("ccgt-meaning-unit-creator");
    root.createEl("h3", {
      text: "Create Meaning Unit"
    });
    root.createEl("p", {
      text: "Select text in an interview, then complete this form. The selected text updates automatically while this form is open."
    });
    root.createEl("label", {
      text: "Selected transcript text"
    });
    this.textPreview = root.createDiv({
      cls: "ccgt-mu-selection-preview"
    });
    this.renderSelectionPreview();
    root.createEl("label", {
      text: "Meaning Unit label"
    });
    this.labelInput = root.createEl("input", {
      type: "text",
      placeholder: "Enter a Meaning Unit label"
    });
    root.createEl("label", {
      text: "Colour family"
    });
    this.familySelect = root.createEl("select");
    FAMILIES.forEach((family) => {
      this.familySelect.createEl("option", {
        value: family,
        text: family[0].toUpperCase() + family.slice(1)
      });
    });
    this.familySelect.value = "yellow";
    root.createEl("label", {
      text: "Shade"
    });
    this.shadeSelect = root.createEl("select");
    SHADES.forEach((shade) => {
      this.shadeSelect.createEl("option", {
        value: shade,
        text: shade[0].toUpperCase() + shade.slice(1)
      });
    });
    this.shadeSelect.value = "light";
    root.createEl("label", {
      text: "Custom colour (HEX)"
    });
    const colourRow = root.createDiv({
      cls: "ccgt-mu-colour-row"
    });
    this.hexInput = colourRow.createEl("input", {
      type: "color"
    });
    this.hexInput.value = HEX.yellow.light;
    this.hexText = colourRow.createEl("input", {
      type: "text",
      value: HEX.yellow.light,
      placeholder: "#FFF4B3"
    });
    this.familySelect.addEventListener("change", () => {
      this.syncStandardColour();
    });
    this.shadeSelect.addEventListener("change", () => {
      this.syncStandardColour();
    });
    this.hexInput.addEventListener("input", () => {
      this.hexText.value = this.hexInput.value.toUpperCase();
    });
    this.hexText.addEventListener("input", () => {
      if (/^#[0-9a-fA-F]{6}$/.test(this.hexText.value)) {
        this.hexInput.value = this.hexText.value;
      }
    });
    const save = root.createEl("button", {
      text: "Save Meaning Unit",
      cls: "mod-cta"
    });
    save.addEventListener("click", async () => {
      if (!this.selection) {
        new import_obsidian5.Notice(
          "Highlight new text in the interview before saving another Meaning Unit."
        );
        return;
      }
      const label = this.labelInput.value.trim();
      if (!label) {
        new import_obsidian5.Notice("Enter a Meaning Unit label.");
        this.labelInput.focus();
        return;
      }
      const selection = this.selection;
      const signature = [
        selection.file.path,
        selection.from.line,
        selection.from.ch,
        selection.to.line,
        selection.to.ch,
        selection.highlightedText
      ].join("|");
      const hex = /^#[0-9a-fA-F]{6}$/.test(this.hexText.value) ? this.hexText.value.toUpperCase() : this.hexInput.value.toUpperCase();
      try {
        await saveMeaningUnitFromSelection(
          this.app,
          this.settings,
          selection,
          {
            label,
            colourFamily: this.familySelect.value,
            colourShade: this.shadeSelect.value,
            hex
          }
        );
        this.lastSavedSignature = signature;
        this.selection = null;
        this.labelInput.value = "";
        this.familySelect.value = "yellow";
        this.shadeSelect.value = "light";
        this.hexInput.value = HEX.yellow.light;
        this.hexText.value = HEX.yellow.light;
        this.renderSelectionPreview();
        new import_obsidian5.Notice("Meaning Unit saved. Highlight the next passage.");
      } catch (error) {
        console.error(
          "CCGT Assistant: Could not save Meaning Unit",
          error
        );
        new import_obsidian5.Notice(
          "Could not save the Meaning Unit. Check the Developer Console."
        );
      }
    });
  }
  syncStandardColour() {
    const family = this.familySelect.value;
    const shade = this.shadeSelect.value;
    const hex = HEX[family][shade];
    this.hexInput.value = hex;
    this.hexText.value = hex;
  }
  renderSelectionPreview() {
    var _a;
    if (!this.textPreview) return;
    this.textPreview.setText(
      ((_a = this.selection) == null ? void 0 : _a.highlightedText) ?? "Highlight text in the interview to display it here."
    );
  }
};
async function openMeaningUnitCreator(app, settings) {
  const active = validateInterviewFile(
    app,
    settings.interviews.folder
  );
  let selection = null;
  if (active) {
    const editor = active.editor;
    const highlightedText = editor.getSelection();
    if (highlightedText.trim()) {
      selection = {
        editor,
        file: active.file,
        highlightedText,
        from: editor.getCursor("from"),
        to: editor.getCursor("to")
      };
    }
  }
  let leaf = app.workspace.getLeavesOfType(MEANING_UNIT_CREATOR_VIEW)[0];
  if (!leaf) {
    leaf = app.workspace.getLeaf("tab");
    await leaf.setViewState({
      type: MEANING_UNIT_CREATOR_VIEW,
      active: true
    });
  }
  await app.workspace.revealLeaf(leaf);
  const view = leaf.view;
  if (!(view instanceof MeaningUnitCreatorView)) {
    new import_obsidian5.Notice(
      "Meaning Unit Creator failed to load. Reload CCGT Assistant."
    );
    return;
  }
  if (selection) {
    view.setSelection(selection);
  } else if (!view["selection"]) {
    new import_obsidian5.Notice(
      "Highlight text in an interview. It will appear in the open Meaning Unit Creator."
    );
  }
}

// src/settings/defaults.ts
var DEFAULT_SETTINGS = {
  interviews: {
    folder: "CCGT/CCGT Interviews"
  },
  memos: {
    folder: "CCGT/CCGT Memos"
  },
  categories: {
    folder: "CCGT/CCGT Categories"
  },
  canvases: {
    folder: "CCGT/CCGT Canvases"
  },
  meaningUnits: {
    dataFile: "CCGT/CCGT Canvases/Meaning Units.json"
  },
  annotation: {
    defaultColourFamily: "yellow",
    defaultColourShade: "light"
  }
};

// src/commands/command-registry.ts
function registerCommands(plugin, commands) {
  for (const command of commands) {
    plugin.addCommand({
      id: command.id,
      name: command.name,
      callback: command.callback
    });
  }
}

// src/commands/meaning-unit-panel.ts
var import_obsidian6 = require("obsidian");
var MEANING_UNIT_VIEW_TYPE = "ccgt-meaning-unit-panel";
var FAMILIES2 = ["red", "orange", "yellow", "green", "blue", "purple"];
var SHADES2 = ["light", "medium", "dark"];
var HEX2 = {
  red: { light: "#FFB3B3", medium: "#FF6666", dark: "#CC0000" },
  orange: { light: "#FFD0A3", medium: "#FF9933", dark: "#E67300" },
  yellow: { light: "#FFF4B3", medium: "#FFD633", dark: "#C9A800" },
  green: { light: "#BFE8BF", medium: "#66B266", dark: "#267326" },
  blue: { light: "#B3D9FF", medium: "#4D94FF", dark: "#0052A3" },
  purple: { light: "#D8B3FF", medium: "#9966CC", dark: "#663399" }
};
var MeaningUnitPanelView = class extends import_obsidian6.ItemView {
  constructor(leaf, settings) {
    super(leaf);
    this.selection = null;
    this.settings = settings;
  }
  getViewType() {
    return MEANING_UNIT_VIEW_TYPE;
  }
  getDisplayText() {
    return "Create Meaning Unit";
  }
  getIcon() {
    return "highlighter";
  }
  async onOpen() {
    this.render();
  }
  async onClose() {
  }
  setSelection(selection) {
    this.selection = selection;
    if (this.labelInput) this.renderSelectionPreview();
  }
  render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("ccgt-meaning-unit-panel");
    root.createEl("h3", { text: "Create Meaning Unit" });
    root.createEl("p", { text: "Select text in an interview, then run Create Meaning Unit. The selection will be retained while you complete this form." });
    root.createEl("label", { text: "Selected transcript text" });
    this.textPreview = root.createDiv({ cls: "ccgt-mu-selection-preview" });
    this.renderSelectionPreview();
    root.createEl("label", { text: "Meaning Unit label" });
    this.labelInput = root.createEl("input", { type: "text", placeholder: "Enter a Meaning Unit label" });
    root.createEl("label", { text: "Colour family" });
    this.familySelect = root.createEl("select");
    FAMILIES2.forEach((f) => this.familySelect.createEl("option", { value: f, text: f[0].toUpperCase() + f.slice(1) }));
    this.familySelect.value = "yellow";
    root.createEl("label", { text: "Shade" });
    this.shadeSelect = root.createEl("select");
    SHADES2.forEach((sh) => this.shadeSelect.createEl("option", { value: sh, text: sh[0].toUpperCase() + sh.slice(1) }));
    this.shadeSelect.value = "light";
    root.createEl("label", { text: "Custom colour (HEX)" });
    const colourRow = root.createDiv({ cls: "ccgt-mu-colour-row" });
    this.hexInput = colourRow.createEl("input", { type: "color" });
    this.hexInput.value = HEX2.yellow.light;
    const hexText = colourRow.createEl("input", { type: "text", value: HEX2.yellow.light, placeholder: "#FFF4B3" });
    this.hexInput.addEventListener("input", () => {
      hexText.value = this.hexInput.value.toUpperCase();
    });
    hexText.addEventListener("input", () => {
      if (/^#[0-9a-fA-F]{6}$/.test(hexText.value)) this.hexInput.value = hexText.value;
    });
    this.hexInput.addEventListener("change", () => {
      hexText.value = this.hexInput.value.toUpperCase();
    });
    this.hexInput.addEventListener("input", () => {
      this.hexInput.dataset.hexText = hexText.value;
    });
    const syncColour = () => {
      const colour = HEX2[this.familySelect.value][this.shadeSelect.value];
      this.hexInput.value = colour;
      hexText.value = colour;
    };
    this.familySelect.addEventListener("change", syncColour);
    this.shadeSelect.addEventListener("change", syncColour);
    const save = root.createEl("button", { text: "Save Meaning Unit", cls: "mod-cta" });
    save.addEventListener("click", async () => {
      if (!this.selection) {
        new import_obsidian6.Notice("CCGT Assistant: Select transcript text first, then run Create Meaning Unit again.");
        return;
      }
      const label = this.labelInput.value.trim();
      const hex = /^#[0-9a-fA-F]{6}$/.test(hexText.value) ? hexText.value.toUpperCase() : this.hexInput.value.toUpperCase();
      if (!label) {
        new import_obsidian6.Notice("Enter a Meaning Unit label.");
        this.labelInput.focus();
        return;
      }
      const selection = this.selection;
      this.selection = null;
      await saveMeaningUnitFromSelection(this.app, this.settings, selection, {
        label,
        colourFamily: this.familySelect.value,
        colourShade: this.shadeSelect.value,
        hex
      });
      this.labelInput.value = "";
      this.renderSelectionPreview();
    });
  }
  renderSelectionPreview() {
    var _a;
    if (!this.textPreview) return;
    this.textPreview.setText(((_a = this.selection) == null ? void 0 : _a.highlightedText) ?? "No transcript selection captured. Select text in the transcript and run Create Meaning Unit again.");
  }
};

// src/commands/new-interview.ts
var import_obsidian8 = require("obsidian");

// src/core/ccgt-paths.ts
var import_obsidian7 = require("obsidian");
var CCGT_ROOT = "CCGT";
var CCGT_PATHS = {
  root: CCGT_ROOT,
  interviews: `${CCGT_ROOT}/CCGT Interviews`,
  memos: `${CCGT_ROOT}/CCGT Memos`,
  categories: `${CCGT_ROOT}/CCGT Categories`,
  canvases: `${CCGT_ROOT}/CCGT Canvases`,
  data: `${CCGT_ROOT}/CCGT Canvases/Meaning Units.json`,
  meaningUnitsCanvas: `${CCGT_ROOT}/CCGT Canvases/Meaning Units.canvas`,
  interviewTemplate: `${CCGT_ROOT}/CCGT Interviews/Interview Transcript Template.md`
};
function normaliseCcgtPath(path) {
  return (0, import_obsidian7.normalizePath)(path);
}

// src/commands/new-interview.ts
var INTERVIEW_TEMPLATE = (created) => `---
created: ${created}
updated: ${created}
---

## Notes


## Meaning Units

_No Meaning Units added yet._

## Transcript

_Paste or type the interview transcript here._

`;
async function createNewInterview(app, settings) {
  const name = await new SimpleInputModal(
    app,
    "New Interview",
    "Interview name"
  ).openAndWait();
  if (!name) {
    return;
  }
  const safeName = name.trim();
  if (!safeName) {
    return;
  }
  const folder = (0, import_obsidian8.normalizePath)(
    settings.interviews.folder
  );
  const path = (0, import_obsidian8.normalizePath)(
    `${folder}/${safeName.endsWith(".md") ? safeName : `${safeName}.md`}`
  );
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof import_obsidian8.TFile) {
    new import_obsidian8.Notice(
      `CCGT Assistant: Interview already exists: ${path}`
    );
    await app.workspace.getLeaf(true).openFile(existing);
    return;
  }
  try {
    const created = new Date().toISOString().slice(0, 19);
    await app.vault.create(
      path,
      INTERVIEW_TEMPLATE(created)
    );
    const file = app.vault.getAbstractFileByPath(path);
    if (file instanceof import_obsidian8.TFile) {
      await app.workspace.getLeaf(true).openFile(file);
    }
    new import_obsidian8.Notice(
      `CCGT Assistant: Interview created: ${safeName}`
    );
  } catch (error) {
    console.error(
      "CCGT Assistant: Could not create interview:",
      error
    );
    new import_obsidian8.Notice(
      "CCGT Assistant: Could not create the interview."
    );
  }
  void CCGT_PATHS;
}

// src/commands/change-meaning-unit-colour.ts
var import_obsidian9 = require("obsidian");
var lastSelectedMeaningUnitId = null;
var lastSelectedMeaningUnitText = null;
function normaliseText(value) {
  return value.replace(/\s+/g, " ").trim();
}
function trackMeaningUnitSelection() {
  const selection = window.getSelection();
  const selectedText = normaliseText((selection == null ? void 0 : selection.toString()) ?? "");
  if (!selectedText) return;
  lastSelectedMeaningUnitText = selectedText;
  document.dispatchEvent(
    new CustomEvent("ccgt-meaning-unit-selection", {
      detail: { selectedText }
    })
  );
}
async function resolveSelectedMeaningUnit(app, settings) {
  var _a, _b;
  const store = await loadMeaningUnitStore(
    app,
    settings.meaningUnits.dataFile
  );
  const view = app.workspace.getActiveViewOfType(import_obsidian9.MarkdownView);
  const activeFile = (_a = view == null ? void 0 : view.file) == null ? void 0 : _a.path;
  const selection = normaliseText(((_b = window.getSelection()) == null ? void 0 : _b.toString()) ?? "") || lastSelectedMeaningUnitText || "";
  if (selection) {
    const match = Object.values(store).find(
      (mu) => (!activeFile || mu.sourceFile === activeFile) && normaliseText(mu.highlightedText) === selection
    );
    if (match) return match.meaningUnitId;
  }
  if (lastSelectedMeaningUnitId && store[lastSelectedMeaningUnitId]) {
    return lastSelectedMeaningUnitId;
  }
  const node = document.querySelector(
    ".canvas-node.is-focused"
  );
  if (node) {
    const canvasMeaningUnitId = node.dataset.ccgtMeaningUnitId;
    if (canvasMeaningUnitId && store[canvasMeaningUnitId]) {
      return canvasMeaningUnitId;
    }
    const link = node.querySelector(
      'a[href*="#^"]'
    );
    const href = link == null ? void 0 : link.getAttribute("href");
    if (href) {
      const match = Object.values(store).find(
        (mu) => href.includes(`#${mu.blockId}`) && href.includes(mu.sourceFile)
      );
      if (match) {
        return match.meaningUnitId;
      }
    }
  }
  return null;
}
async function changeFocusedMeaningUnitColour(app, settings) {
  const meaningUnitId = await resolveSelectedMeaningUnit(app, settings);
  if (!meaningUnitId) {
    new import_obsidian9.Notice(
      "CCGT Assistant: Select Meaning Unit text or a Meaning Unit Canvas card first."
    );
    return;
  }
  const store = await loadMeaningUnitStore(
    app,
    settings.meaningUnits.dataFile
  );
  const meaningUnit = store[meaningUnitId];
  if (!meaningUnit) {
    new import_obsidian9.Notice("CCGT Assistant: Meaning Unit not found.");
    return;
  }
  const result = await new MeaningUnitColourPickerModal(app, {
    colourFamily: meaningUnit.colourFamily,
    colourShade: meaningUnit.colourShade,
    hex: meaningUnit.colourHex
  }).openAndWait();
  if (!result) return;
  meaningUnit.colourFamily = result.colourFamily;
  meaningUnit.colourShade = result.colourShade;
  meaningUnit.colourHex = result.hex;
  meaningUnit.updated = (/* @__PURE__ */ new Date()).toISOString();
  await saveMeaningUnitStore(
    app,
    settings.meaningUnits.dataFile,
    store
  );
  await updateMeaningUnitCanvasNodeColour(app, meaningUnit);
  refreshVisibleColour(meaningUnit);
  new import_obsidian9.Notice("CCGT Assistant: Meaning Unit colour updated.");
}

async function updateMeaningUnitCanvasNodeColour(app, meaningUnit) {
  // Preserve native Obsidian Canvas colours.
  void app;
  void meaningUnit;
}

function refreshVisibleColour(meaningUnit) {
  // Only update transcript highlights, never Canvas cards.
  document.querySelectorAll(".ccgt-meaning-unit-highlight").forEach((element) => {
    const id = element.getAttribute("data-ccgt-meaning-unit-id");
    if (id === meaningUnit.meaningUnitId && meaningUnit.colourHex) {
      element.style.setProperty("background-color", meaningUnit.colourHex, "important");
    }
  });
}

function familyText(family) {
  return {
    red: "#7A0000",
    orange: "#7A3E00",
    yellow: "#5C4800",
    green: "#174D17",
    blue: "#003B75",
    purple: "#47216F"
  }[family] ?? "#222222";
}
function familyLight(family) {
  return {
    red: "#FFB3B3",
    orange: "#FFD0A3",
    yellow: "#FFF4B3",
    green: "#BFE8BF",
    blue: "#B3D9FF",
    purple: "#D8B3FF"
  }[family] ?? "#FFFFFF";
}
function familyDark(family) {
  return {
    red: "#CC0000",
    orange: "#E67300",
    yellow: "#9A7B00",
    green: "#267326",
    blue: "#0052A3",
    purple: "#663399"
  }[family] ?? "#222222";
}

// src/meaning-units/meaning-unit-renderer.ts
var import_obsidian10 = require("obsidian");
function normaliseText2(value) {
  return value.replace(/\s+/g, " ").trim();
}
function applyColour(element, meaningUnit) {
  element.style.setProperty(
    "background-color",
    meaningUnit.colourHex,
    "important"
  );
  element.style.setProperty(
    "--ccgt-meaning-unit-colour",
    meaningUnit.colourHex,
    "important"
  );
}
async function renderMeaningUnitColours(app, element, context, settings) {
  const store = await loadMeaningUnitStore(
    app,
    settings.meaningUnits.dataFile
  );
  const entries = Object.values(store).filter(
    (mu) => mu.sourceFile === context.sourcePath
  );
  if (!entries.length) {
    new import_obsidian10.MarkdownRenderChild(element);
    return;
  }
  const marks = element.querySelectorAll("mark");
  marks.forEach((mark) => {
    const text = normaliseText2(mark.textContent ?? "");
    const meaningUnit = entries.find(
      (mu) => normaliseText2(mu.highlightedText) === text
    );
    if (meaningUnit) {
      applyColour(mark, meaningUnit);
      mark.addClass("ccgt-meaning-unit-highlight");
    }
  });
  const links = element.querySelectorAll(
    'a[href*="#^"]'
  );
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const label = normaliseText2(link.textContent ?? "");
    const meaningUnit = entries.find(
      (mu) => normaliseText2(mu.label) === label && href.includes(mu.sourceFile) && href.includes(`#${mu.blockId}`)
    ) ?? entries.find(
      (mu) => href.includes(mu.sourceFile) && href.includes(`#${mu.blockId}`)
    );
    if (!meaningUnit) return;
    link.style.setProperty(
      "color",
      meaningUnit.colourHex,
      "important"
    );
    link.style.setProperty(
      "text-decoration-color",
      meaningUnit.colourHex,
      "important"
    );
    link.addClass("ccgt-meaning-unit-link");
  });
  new import_obsidian10.MarkdownRenderChild(element);
}
function refreshLivePreview(app, store) {
  const entries = Object.values(store);
  document.querySelectorAll(
    ".cm-line mark, .cm-line .cm-highlight, .cm-line .cm-formatting-highlight"
  ).forEach((element) => {
    const text = normaliseText2(
      element.textContent ?? ""
    );
    const meaningUnit = entries.find(
      (mu) => normaliseText2(mu.highlightedText) === text
    );
    if (meaningUnit) {
      applyColour(element, meaningUnit);
      element.setAttribute(
        "data-ccgt-meaning-unit-id",
        meaningUnit.meaningUnitId
      );
      element.addClass(
        "ccgt-meaning-unit-highlight"
      );
    }
  });
  void app;
}
function watchMeaningUnitLivePreview(app, dataFilePath) {
  let timer = null;
  const refresh = async () => {
    const store = await loadMeaningUnitStore(app, dataFilePath);
    refreshLivePreview(app, store);
  };
  const schedule = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = null;
      void refresh();
    }, 50);
  };
  schedule();
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
  const layoutRef = app.workspace.on("layout-change", schedule);
  return () => {
    observer.disconnect();
    app.workspace.offref(layoutRef);
    if (timer !== null) window.clearTimeout(timer);
  };
}

// src/core/ccgt-folder-manager.ts
var import_obsidian11 = require("obsidian");
async function ensureCcgtFolders(app) {
  const folders = [
    CCGT_PATHS.root,
    CCGT_PATHS.interviews,
    CCGT_PATHS.memos,
    CCGT_PATHS.categories,
    CCGT_PATHS.canvases
  ];
  for (const folderPath of folders) {
    const path = normaliseCcgtPath(folderPath);
    const existing = app.vault.getAbstractFileByPath(path);
    if (existing instanceof import_obsidian11.TFolder) {
      continue;
    }
    if (existing) {
      console.warn(
        `CCGT Assistant: Cannot create folder "${path}" because a file already exists there.`
      );
      continue;
    }
    try {
      await app.vault.createFolder(path);
    } catch (error) {
      console.error(
        `CCGT Assistant: Could not create folder "${path}":`,
        error
      );
    }
  }
}

// src/meaning-units/meaning-unit-canvas-styles.ts
function familyLight2(family) {
  return {
    red: "#FFB3B3",
    orange: "#FFD0A3",
    yellow: "#FFF4B3",
    green: "#BFE8BF",
    blue: "#B3D9FF",
    purple: "#D8B3FF"
  }[family] ?? "#FFFFFF";
}
function familyDark2(family) {
  return {
    red: "#CC0000",
    orange: "#E67300",
    yellow: "#9A7B00",
    green: "#267326",
    blue: "#0052A3",
    purple: "#663399"
  }[family] ?? "#222222";
}
function familyText2(family) {
  return {
    red: "#7A0000",
    orange: "#7A3E00",
    yellow: "#5C4800",
    green: "#174D17",
    blue: "#003B75",
    purple: "#47216F"
  }[family] ?? "#222222";
}
function findMeaningUnitForCanvasNode(node, store) {
  const link = node.querySelector(
    'a.internal-link[href*="#^"]'
  );
  if (!link) {
    return null;
  }
  const href = link.getAttribute("href") ?? "";
  const label = (link.textContent ?? "").trim();
  const labelMatch = Object.values(store).find(
    (meaningUnit) => meaningUnit.label === label && href.includes(meaningUnit.sourceFile) && href.includes(`#${meaningUnit.blockId}`)
  );
  if (labelMatch) {
    return labelMatch;
  }
  return Object.values(store).find(
    (meaningUnit) => href.includes(meaningUnit.sourceFile) && href.includes(`#${meaningUnit.blockId}`)
  ) ?? null;
}
function styleNode(node, meaningUnit) {
  // Do not apply inline colour styles to Canvas cards.
  void node;
  void meaningUnit;
}

async function refreshMeaningUnitCanvasStyles(app, dataFilePath) {
  // Leave Canvas card styling to Obsidian.
  void app;
  void dataFilePath;
}

function watchMeaningUnitCanvas(app, dataFilePath) {
  let timer = null;
  const refresh = () => {
    if (timer !== null) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      timer = null;
      void refreshMeaningUnitCanvasStyles(
        app,
        dataFilePath
      );
    }, 100);
  };
  refresh();
  const observer = new MutationObserver(() => {
    if (document.querySelector(
      ".canvas-node"
    )) {
      refresh();
    }
  });
  observer.observe(
    document.body,
    {
      childList: true,
      subtree: true
    }
  );
  return () => {
    observer.disconnect();
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };
}


// Standalone CCGT Assistant Canvas colour picker. No third-party plugin dependency.
var CCGT_COLOUR_SWATCHES = [
  ["Red", "#E53935"], ["Coral", "#FF7043"], ["Orange", "#FB8C00"], ["Amber", "#FFB300"],
  ["Yellow", "#FDD835"], ["Lime", "#C0CA33"], ["Green", "#43A047"], ["Mint", "#26A69A"],
  ["Teal", "#00ACC1"], ["Cyan", "#29B6F6"], ["Blue", "#1E88E5"], ["Indigo", "#3949AB"],
  ["Violet", "#8E24AA"], ["Magenta", "#D81B60"], ["Pink", "#F06292"], ["Brown", "#795548"],
  ["Grey", "#78909C"], ["White", "#FFFFFF"], ["Charcoal", "#37474F"], ["Black", "#000000"]
];
var CCGTCanvasColourPickerModal = class extends import_obsidian12.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.hex = "#FDD835";
  }
  onOpen() {
    const root = this.contentEl;
    root.empty();
    root.addClass("ccgt-canvas-colour-picker");
    root.createEl("h2", { text: "Canvas Colour Pencil" });
    root.createEl("p", { text: "Choose a swatch or select any custom colour, then apply it to selected Canvas cards." });
    const grid = root.createDiv({ cls: "ccgt-colour-swatch-grid" });
    for (const [name, hex] of CCGT_COLOUR_SWATCHES) {
      const swatch = grid.createEl("button", { cls: "ccgt-colour-swatch", attr: { type: "button", title: `${name} ${hex}`, "aria-label": name } });
      swatch.style.backgroundColor = hex;
      swatch.addEventListener("click", () => {
        this.setColour(hex);
        grid.querySelectorAll(".ccgt-colour-swatch").forEach((el) => el.removeClass("is-selected"));
        swatch.addClass("is-selected");
      });
    }
    const custom = root.createDiv({ cls: "ccgt-colour-custom-row" });
    custom.createEl("label", { text: "Custom colour" });
    this.colourInput = custom.createEl("input", { type: "color", value: this.hex });
    this.hexInput = custom.createEl("input", { type: "text", value: this.hex, attr: { placeholder: "#RRGGBB", spellcheck: "false" } });
    this.preview = root.createDiv({ cls: "ccgt-colour-preview" });
    this.colourInput.addEventListener("input", () => this.setColour(this.colourInput.value, false));
    this.hexInput.addEventListener("change", () => {
      let value = this.hexInput.value.trim();
      if (/^#?(?:[0-9a-f]{6}|[0-9a-f]{3})$/i.test(value)) {
        if (!value.startsWith("#")) value = "#" + value;
        if (value.length === 4) value = "#" + [...value.slice(1)].map((c) => c + c).join("");
        this.setColour(value);
      } else {
        new import_obsidian12.Notice("Enter a valid HEX colour, such as #4A90E2.");
        this.hexInput.value = this.hex;
      }
    });
    const buttons = root.createDiv({ cls: "modal-button-container" });
    buttons.createEl("button", { text: "Cancel" }).addEventListener("click", () => this.close());
    buttons.createEl("button", { text: "Apply to selected cards", cls: "mod-cta" }).addEventListener("click", async () => {
      await this.plugin.applyCanvasCardColour(this.hex);
      this.close();
    });
  }
  setColour(hex, updatePicker = true) {
    this.hex = hex.toUpperCase();
    if (updatePicker && this.colourInput) this.colourInput.value = this.hex;
    if (this.hexInput) this.hexInput.value = this.hex;
    if (this.preview) this.preview.style.backgroundColor = this.hex;
  }
};

// src/main.ts
var CcgtAssistantPlugin = class extends import_obsidian12.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.patchedCanvases = new WeakSet();
    this.scanTimers = new WeakMap();
    this.syncingCanvases = new WeakSet();
    this.edgeStates = new WeakMap();
    this.restorers = [];
    this.pendingTimers = new Set();
  }
  async onload() {
    console.log(
      "CCGT Assistant: loading"
    );
    this.addRibbonIcon("pencil", "Canvas Colour Pencil", () => {
      new CCGTCanvasColourPickerModal(this.app, this).open();
    });
    this.addCommand({
      id: "canvas-colour-pencil",
      name: "Canvas Colour Pencil: choose colour for selected cards",
      callback: () => new CCGTCanvasColourPickerModal(this.app, this).open()
    });
    this.startCardAnchoredColourSelector();
    await ensureCcgtFolders(
      this.app
    );
    this.registerEvent(this.app.vault.on("create", (file) => {
      if (!(file instanceof import_obsidian12.TFile)) return;
      const parentFolder = file.parent?.path ?? "";
      const transcriptFolder = normaliseCcgtPath(this.settings.interviews.folder).replace(/\/$/, "");
      const memoFolder = normaliseCcgtPath(this.settings.memos.folder).replace(/\/$/, "");
      const isTranscript = parentFolder === transcriptFolder;
      const isMemo = parentFolder === memoFolder;
      if (!isTranscript && !isMemo) return;
      const now = new Date().toISOString().slice(0, 19);
      window.setTimeout(async () => {
        try {
          const latest = await this.app.vault.read(file);
          let updated = latest;
          if (updated.startsWith("---\n")) {
            const closing = updated.indexOf("\n---", 4);
            if (closing !== -1) {
              let frontmatter = updated.slice(4, closing);
              if (!/^created\s*:/m.test(frontmatter)) frontmatter += `${frontmatter ? "\n" : ""}created: ${now}`;
              if (!/^updated\s*:/m.test(frontmatter)) frontmatter += `${frontmatter ? "\n" : ""}updated: ${now}`;
              updated = `---\n${frontmatter}\n---${updated.slice(closing + 4)}`;
            }
          } else {
            updated = `---\ncreated: ${now}\nupdated: ${now}\n---\n\n${updated}`;
          }
          if (isTranscript) {
            const frontmatterMatch = updated.match(/^---\n[\s\S]*?\n---\n?/);
            const body = frontmatterMatch ? updated.slice(frontmatterMatch[0].length) : updated;
            if (!body.trim()) {
              updated = `${frontmatterMatch ? frontmatterMatch[0].replace(/\n?$/, "\n\n") : ""}## Notes\n\n\n## Meaning Units\n\n_No Meaning Units added yet._\n\n## Transcript\n\n_Paste or type the interview transcript here._\n`;
            }
          }
          if (updated !== latest) await this.app.vault.modify(file, updated);
          // Only prompt when the newly created memo is the active file.
          if (isMemo && this.app.workspace.getActiveFile() === file) {
            this.showMemoCategoryPicker(file);
          }
        } catch (error) {
          console.error("CCGT Assistant: Could not add default properties or memo category:", error);
        }
      }, 150);
    }));
    this.showMemoCategoryPicker = (file) => {
      const modal = new import_obsidian12.Modal(this.app);
      modal.titleEl.setText("Memo category");
      modal.contentEl.createEl("p", { text: "Select one or more categories to add to the end of this memo's filename." });
      const categories = ["Coding", "Theoretical", "Operational"];
      const selected = new Set();
      for (const category of categories) {
        const row = modal.contentEl.createEl("label", { cls: "ccgt-memo-category-option" });
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";
        row.style.margin = "8px 0";
        const checkbox = row.createEl("input", { type: "checkbox" });
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) selected.add(category);
          else selected.delete(category);
        });
        row.createSpan({ text: category });
      }
      const buttons = modal.contentEl.createDiv({ cls: "modal-button-container" });
      const skip = buttons.createEl("button", { text: "Skip" });
      skip.addEventListener("click", () => modal.close());
      const apply = buttons.createEl("button", { text: "Apply category", cls: "mod-cta" });
      apply.addEventListener("click", async () => {
        try {
          if (selected.size > 0 && file.parent) {
            const suffix = [...selected].map((category) => `— ${category}`).join(" ");
            const cleanBase = file.basename.replace(/\s+—\s+(?:Coding|Theoretical|Operational)(?:\s+—\s+(?:Coding|Theoretical|Operational))*$/g, "");
            const newPath = `${file.parent.path}/${cleanBase} ${suffix}.${file.extension}`;
            if (newPath !== file.path) await this.app.fileManager.renameFile(file, newPath);
          }
        } catch (error) {
          console.error("CCGT Assistant: Could not apply memo category to filename:", error);
          new import_obsidian12.Notice("CCGT Assistant: Could not rename memo. Check whether a file with that name already exists.");
        }
        modal.close();
      });
      modal.open();
    };
    this.registerView(
      MEANING_UNIT_VIEW_TYPE,
      (leaf) => new MeaningUnitPanelView(leaf, this.settings)
    );
    this.registerView(
      MEANING_UNIT_CREATOR_VIEW,
      (leaf) => new MeaningUnitCreatorView(
        leaf,
        this.app,
        this.settings
      )
    );
    registerCommands(
      this,
      [
        {
          id: "add-meaning-unit",
          name: "Add Meaning Unit",
          callback: () => openMeaningUnitCreator(
            this.app,
            this.settings
          )
        },
        {
          id: "new-interview",
          name: "New Interview",
          callback: () => createNewInterview(
            this.app,
            this.settings
          )
        },
        {
          id: "change-meaning-unit-colour",
          name: "Change Meaning Unit Colour",
          callback: () => changeFocusedMeaningUnitColour(
            this.app,
            this.settings
          )
        }
      ]
    );
    this.registerMarkdownPostProcessor(
      (element, context) => renderMeaningUnitColours(
        this.app,
        element,
        context,
        this.settings
      )
    );
    this.registerDomEvent(
      document,
      "selectionchange",
      () => trackMeaningUnitSelection(this.app)
    );
    this.register(
      watchMeaningUnitLivePreview(
        this.app,
        this.settings.meaningUnits.dataFile
      )
    );
    this.register(
      watchMeaningUnitCanvas(
        this.app,
        this.settings.meaningUnits.dataFile
      )
    );
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => {
      this.attachToActiveCanvas();
    }));
    this.app.workspace.onLayoutReady(() => {
      this.attachToActiveCanvas();
    });
    this.registerInterval(window.setInterval(() => {
      this.attachToActiveCanvas();
      const view = this.app.workspace.activeLeaf?.view;
      if (view?.getViewType?.() === "canvas" && view.canvas) {
        this.scheduleScan(view.canvas, 0);
      }
    }, 1500));
    console.log(
      "CCGT Assistant: ready"
    );
  }
  onunload() {
    this.stopCardAnchoredColourSelector?.();
    for (const timer of this.pendingTimers) window.clearTimeout(timer);
    this.pendingTimers.clear();
    for (const restore of this.restorers) {
      try { restore(); } catch (error) { console.warn("[CCGT Assistant] Canvas hook restore failed:", error); }
    }
    console.log(
      "CCGT Assistant: unloaded"
    );
  }

  startCardAnchoredColourSelector() {
    this.stopCardAnchoredColourSelector();
    const plugin = this;
    const native = [
      ["0", "#BDBDBD", "Grey"], ["1", "#E53935", "Red"],
      ["2", "#F57C00", "Orange"], ["3", "#E6B800", "Yellow"],
      ["4", "#16A34A", "Green"], ["5", "#06A6A6", "Cyan"],
      ["6", "#7856D8", "Purple"]
    ];
    const pencils = ["#F4A6A6", "#FFB366", "#FFE680", "#A8E6A3", "#8EDFE0", "#A9C7FF", "#C5A6F5", "#F3A6D8", "#A65C5C", "#A66B32", "#6D8B74", "#6576A8", "#795548", "#607D8B", "#FFFFFF", "#333333"];
    const make = (tag, rules, parent = document.body) => {
      const el = document.createElement(tag);
      Object.assign(el.style, rules);
      parent.appendChild(el);
      return el;
    };
    const toolbar = make("div", {
      position: "fixed", zIndex: "999998", display: "none", alignItems: "center",
      gap: "7px", padding: "6px 9px", background: "var(--background-primary, #fff)",
      border: "1px solid var(--background-modifier-border, #ccc)", borderRadius: "9px",
      boxShadow: "0 2px 9px rgba(0,0,0,.18)", whiteSpace: "nowrap", fontFamily: "sans-serif"
    });
    toolbar.id = "ccgt-card-colour-toolbar";
    const pencilPanel = make("div", {
      position: "fixed", zIndex: "999999", display: "none",
      gridTemplateColumns: "repeat(8, 22px)", gap: "7px", padding: "9px",
      background: "var(--background-primary, #fff)", border: "1px solid var(--background-modifier-border, #ccc)",
      borderRadius: "9px", boxShadow: "0 3px 12px rgba(0,0,0,.2)"
    });
    pencilPanel.id = "ccgt-pencil-swatches";
    const picker = make("div", {
      position: "fixed", zIndex: "1000000", display: "none", flexDirection: "column",
      gap: "8px", width: "234px", padding: "10px", boxSizing: "border-box",
      background: "var(--background-primary, #fff)", color: "var(--text-normal, #111)",
      border: "1px solid var(--background-modifier-border, #aaa)", borderRadius: "9px",
      boxShadow: "0 3px 14px rgba(0,0,0,.22)", font: "12px Arial, sans-serif"
    });
    picker.id = "ccgt-custom-wheel-panel";
    picker.innerHTML = `
      <div id="ccgt-wheel-square" style="height:140px;position:relative;cursor:crosshair;background:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(0,100%,50%))">
        <div id="ccgt-wheel-marker" style="position:absolute;width:9px;height:9px;border:2px solid white;border-radius:50%;box-shadow:0 0 2px #000;left:100%;top:0;transform:translate(-50%,-50%);pointer-events:none"></div>
      </div>
      <input id="ccgt-wheel-hue" type="range" min="0" max="359" value="0" aria-label="Hue" style="display:block;width:100%;height:22px;min-height:22px;margin:0;box-sizing:border-box;cursor:pointer;background:linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)">
      <div style="display:flex;align-items:center;gap:5px">
        <input id="ccgt-wheel-hex" value="#FF0000" maxlength="7" aria-label="HEX colour" style="width:85px;min-width:0;padding:6px;box-sizing:border-box">
        <input id="ccgt-wheel-r" type="number" min="0" max="255" value="255" aria-label="Red" style="width:39px;min-width:0;padding:5px;box-sizing:border-box">
        <input id="ccgt-wheel-g" type="number" min="0" max="255" value="0" aria-label="Green" style="width:39px;min-width:0;padding:5px;box-sizing:border-box">
        <input id="ccgt-wheel-b" type="number" min="0" max="255" value="0" aria-label="Blue" style="width:39px;min-width:0;padding:5px;box-sizing:border-box">
      </div>
      <div style="display:flex;justify-content:space-between"><span>HEX</span><span>R</span><span>G</span><span>B</span></div>
      <button id="ccgt-wheel-apply" style="width:100%;min-height:34px;margin-top:2px;padding:8px;border:1px solid #8886;border-radius:7px;cursor:pointer;font-weight:600">Apply Colour</button>`;
    const $ = id => picker.querySelector("#" + id);
    const square = $("ccgt-wheel-square"), marker = $("ccgt-wheel-marker"), hue = $("ccgt-wheel-hue"), hex = $("ccgt-wheel-hex");
    const rgbFields = [$("ccgt-wheel-r"), $("ccgt-wheel-g"), $("ccgt-wheel-b")], applyButton = $("ccgt-wheel-apply");
    let h = 0, sat = 1, val = 1, colour = "#FF0000";
    const hsvToHex = (h, s, v) => {
      const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
      const rgb = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
      return "#" + rgb.map(n => Math.round((n + m) * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
    };
    const setColour = value => {
      if (!/^#[0-9a-f]{6}$/i.test(value)) return false;
      colour = value.toUpperCase(); hex.value = colour;
      const rgb = colour.slice(1).match(/.{2}/g).map(n => parseInt(n, 16));
      rgbFields.forEach((field, i) => field.value = rgb[i]);
      const brightness = .299 * rgb[0] + .587 * rgb[1] + .114 * rgb[2];
      applyButton.style.setProperty("background-color", colour, "important");
      applyButton.style.setProperty("color", brightness > 150 ? "#000" : "#fff", "important");
      applyButton.textContent = "Apply Colour";
      return true;
    };
    const render = () => {
      setColour(hsvToHex(h, sat, val));
      square.style.background = `linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(${h},100%,50%))`;
      marker.style.left = `${sat * 100}%`; marker.style.top = `${(1 - val) * 100}%`;
    };
    const moveSquare = event => {
      const r = square.getBoundingClientRect();
      sat = Math.max(0, Math.min(1, (event.clientX - r.left) / r.width));
      val = 1 - Math.max(0, Math.min(1, (event.clientY - r.top) / r.height));
      render();
    };
    square.addEventListener("pointerdown", event => { square.setPointerCapture?.(event.pointerId); moveSquare(event); });
    square.addEventListener("pointermove", event => { if (event.buttons === 1) moveSquare(event); });
    hue.addEventListener("input", () => { h = Number(hue.value); render(); });
    hex.addEventListener("input", () => { if (/^#[0-9a-f]{6}$/i.test(hex.value)) setColour(hex.value); });
    rgbFields.forEach(field => field.addEventListener("input", () => {
      const rgb = rgbFields.map(f => Math.max(0, Math.min(255, Number(f.value) || 0)));
      setColour("#" + rgb.map(n => n.toString(16).padStart(2, "0")).join(""));
    }));
    applyButton.onclick = () => {
      if (!setColour(hex.value)) { console.warn("Enter a valid six-digit HEX colour."); return; }
      plugin.applyCanvasCardColour(colour);
      picker.style.display = "none";
    };
    hex.addEventListener("keydown", event => { if (event.key === "Enter") applyButton.click(); });

    for (const [id, hexValue, label] of native) {
      const b = make("button", { width: "21px", height: "21px", flex: "0 0 21px", padding: "0", border: "1px solid rgba(128,128,128,.4)", borderRadius: "50%", background: hexValue, cursor: "pointer" }, toolbar);
      b.title = `${label} (Obsidian colour ${id})`; b.onclick = () => plugin.applyCanvasCardColour(id);
    }
    const icon = (symbol, title) => {
      const b = make("button", { width: "27px", height: "29px", flex: "0 0 27px", padding: "0", border: "none", borderRadius: "6px", background: "transparent", color: "var(--text-normal, #222)", cursor: "pointer", fontSize: "19px" }, toolbar);
      b.textContent = symbol; b.title = title; return b;
    };
    const pencil = icon("✏️", "Coloured-pencil swatches"), rainbow = icon("🌈", "Custom colour picker");
    for (const c of pencils) {
      const b = make("button", { width: "22px", height: "22px", padding: "0", borderRadius: "50%", border: "1px solid rgba(128,128,128,.45)", background: c, cursor: "pointer" }, pencilPanel);
      b.title = c; b.onclick = () => { plugin.applyCanvasCardColour(c); pencilPanel.style.display = "none"; };
    }
    pencil.onclick = () => { pencilPanel.style.display = pencilPanel.style.display === "none" ? "grid" : "none"; picker.style.display = "none"; position(); };
    rainbow.onclick = () => { picker.style.display = picker.style.display === "none" ? "flex" : "none"; pencilPanel.style.display = "none"; if (picker.style.display !== "none") render(); position(); };

    const cardElement = node => {
      const id = node?.id ?? node?.data?.id, els = [...document.querySelectorAll(".canvas-node")];
      if (id != null) { const found = els.find(el => el.dataset.nodeId === String(id) || el.getAttribute("data-node-id") === String(id) || el.dataset.id === String(id)); if (found) return found; }
      for (const key of ["nodeEl", "containerEl", "el", "element"]) {
        const el = node?.[key];
        if (el instanceof Element) { const found = el.matches?.(".canvas-node") ? el : el.closest?.(".canvas-node"); if (found) return found; }
      }
      return null;
    };
    function position() {
      const view = plugin.app.workspace.activeLeaf?.view;
      if (view?.getViewType?.() !== "canvas" || !view.canvas) { toolbar.style.display = pencilPanel.style.display = picker.style.display = "none"; return; }
      const nodes = plugin.getCanvasSelectedNodes().filter(n => (n?.data ?? n?.getData?.())?.type !== "edge");
      const els = nodes.map(cardElement).filter(Boolean);
      if (!nodes.length || !els.length) { toolbar.style.display = pencilPanel.style.display = picker.style.display = "none"; return; }
      const rects = els.map(el => el.getBoundingClientRect()), left = Math.min(...rects.map(r => r.left)), right = Math.max(...rects.map(r => r.right)), top = Math.min(...rects.map(r => r.top));
      toolbar.style.display = "flex";
      const w = toolbar.offsetWidth, th = toolbar.offsetHeight;
      const x = Math.max(8, Math.min(left + (right - left - w) / 2, innerWidth - w - 8));
      let y = top - th - 8; if (y < 8) y = Math.min(top + 8, innerHeight - th - 8);
      toolbar.style.left = `${x}px`; toolbar.style.top = `${y}px`;
      for (const panel of [pencilPanel, picker]) if (panel.style.display !== "none") {
        const pw = panel.offsetWidth, ph = panel.offsetHeight; let px = Math.max(8, Math.min(x, innerWidth - pw - 8)), py = y - ph - 5;
        if (py < 8) py = Math.min(y + th + 5, innerHeight - ph - 8);
        panel.style.left = `${px}px`; panel.style.top = `${Math.max(8, py)}px`;
      }
    }
    const outsideClick = event => {
      if (picker.style.display !== "none" && !picker.contains(event.target) && !toolbar.contains(event.target)) picker.style.display = "none";
      if (pencilPanel.style.display !== "none" && !pencilPanel.contains(event.target) && !toolbar.contains(event.target)) pencilPanel.style.display = "none";
    };
    document.addEventListener("pointerdown", outsideClick, true);
    const observer = new MutationObserver(position);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "data-node-id"] });
    const timer = window.setInterval(position, 250);
    window.addEventListener("resize", position);
    this.ccgtColourToolbarCleanup = () => {
      observer.disconnect(); window.clearInterval(timer); document.removeEventListener("pointerdown", outsideClick, true); window.removeEventListener("resize", position);
      toolbar.remove(); pencilPanel.remove(); picker.remove();
    };
    render(); position();
  }
  stopCardAnchoredColourSelector() {
    if (this.ccgtColourToolbarCleanup) {
      try { this.ccgtColourToolbarCleanup(); } catch (error) { console.warn(error); }
      this.ccgtColourToolbarCleanup = null;
    }
    for (const id of ["ccgt-card-colour-toolbar", "ccgt-pencil-swatches", "ccgt-custom-wheel-panel"]) document.getElementById(id)?.remove();
  }
  getCanvasSelectedNodes() {
    const view = this.app.workspace.activeLeaf?.view;
    if (view?.getViewType?.() !== "canvas" || !view.canvas) return [];
    const canvas = view.canvas;
    const result = [];
    const seen = new Set();
    const allNodes = canvas.nodes && typeof canvas.nodes.values === "function"
      ? Array.from(canvas.nodes.values())
      : [];
    const resolveNode = (item) => {
      if (!item) return null;
      if (typeof item === "object" && (item.data || typeof item.getData === "function")) return item;
      if (typeof item === "string") {
        return canvas.nodes?.get?.(item)
          || allNodes.find((node) => node?.id === item || node?.data?.id === item)
          || null;
      }
      if (typeof item === "object" && typeof item.id === "string") {
        return canvas.nodes?.get?.(item.id)
          || allNodes.find((node) => node?.id === item.id)
          || item;
      }
      return null;
    };
    const add = (item) => {
      const node = resolveNode(item);
      if (node && !seen.has(node)) {
        seen.add(node);
        result.push(node);
      }
    };
    const selection = canvas.selection;
    if (selection && typeof selection[Symbol.iterator] === "function") {
      for (const item of selection) add(item);
    }
    // Canvas implementations can expose selection as IDs, nodes, or a separate
    // selected flag. Resolve each form and fall back to selected nodes if needed.
    if (!result.length) {
      for (const node of allNodes) {
        if (node?.isSelected === true || node?.selection?.isSelected === true || node?.selected === true) add(node);
      }
    }
    return result;
  }
  async applyCanvasCardColour(hex) {
    const view = this.app.workspace.activeLeaf?.view;
    if (view?.getViewType?.() !== "canvas" || !view.canvas) {
      new import_obsidian12.Notice("Open a Canvas and select one or more cards first.");
      return;
    }
    const canvas = view.canvas;
    const nodes = this.getCanvasSelectedNodes().filter((node) => {
      const data = node?.data ?? node?.getData?.();
      return !!data && data.type !== "edge";
    });
    if (!nodes.length) {
      new import_obsidian12.Notice("Select one or more Canvas cards first, then choose a colour.");
      return;
    }
    let changed = 0;
    for (const node of nodes) {
      try {
        if (typeof node.setColor === "function") {
          node.setColor(hex);
          changed++;
        } else {
          const data = node.data ?? node.getData?.();
          if (data && typeof data === "object") {
            data.color = hex;
            if (typeof node.render === "function") node.render();
            changed++;
          }
        }
      } catch (error) {
        console.warn("[CCGT Assistant] Canvas card colour update failed:", error);
      }
    }
    try {
      if (changed && typeof canvas.requestSave === "function") canvas.requestSave();
      else if (changed && typeof canvas.setData === "function" && typeof canvas.getData === "function") {
        canvas.setData(canvas.getData());
      }
      if (changed && typeof canvas.requestFrame === "function") canvas.requestFrame();
    } catch (error) {
      console.warn("[CCGT Assistant] Canvas save request failed:", error);
    }
    if (changed) new import_obsidian12.Notice(`Applied ${hex} to ${changed} Canvas card${changed === 1 ? "" : "s"}.`);
    else new import_obsidian12.Notice("Could not update the selected cards. Check the Developer Console.");
  }
  attachToActiveCanvas() {
    const view = this.app.workspace.activeLeaf?.view;
    if (view?.getViewType?.() !== "canvas" || !view.canvas) return;
    const canvas = view.canvas;
    if (this.patchedCanvases.has(canvas)) return;
    this.patchedCanvases.add(canvas);
    if (typeof canvas.requestSave === "function") {
      const original = canvas.requestSave;
      const plugin = this;
      const wrapped = function (...args) {
        const result = original.apply(this, args);
        if (!plugin.syncingCanvases.has(canvas)) plugin.scheduleScan(canvas, 100);
        return result;
      };
      try {
        canvas.requestSave = wrapped;
        if (canvas.requestSave === wrapped) {
          this.restorers.push(() => {
            if (canvas.requestSave === wrapped) canvas.requestSave = original;
          });
        }
      } catch (error) {
        console.warn("[CCGT Assistant] Could not attach Canvas save listener:", error);
      }
    }
    this.scheduleScan(canvas, 250);
  }
  scheduleScan(canvas, delay = 100) {
    const previous = this.scanTimers.get(canvas);
    if (previous) {
      window.clearTimeout(previous);
      this.pendingTimers.delete(previous);
    }
    const timer = window.setTimeout(() => {
      this.scanTimers.delete(canvas);
      this.pendingTimers.delete(timer);
      this.syncEdgeColours(canvas);
    }, delay);
    this.scanTimers.set(canvas, timer);
    this.pendingTimers.add(timer);
  }
  getNodeId(value) {
    if (typeof value === "string") return value;
    if (value && typeof value.id === "string") return value.id;
    return null;
  }
  getDestination(edge, nodes) {
    const data = edge.data ?? edge.getData?.() ?? {};
    const candidates = [edge.to, edge.toNode, data.toNode];
    for (const candidate of candidates) {
      const id = this.getNodeId(candidate);
      if (id && nodes.has(id)) return nodes.get(id);
    }
    return null;
  }
  getNodeColour(node) {
    if (node?.color !== undefined && node.color !== null) return node.color;
    if (node?.data?.color !== undefined && node.data.color !== null) return node.data.color;
    if (typeof node?.getData === "function") {
      try {
        const data = node.getData();
        if (data?.color !== undefined && data.color !== null) return data.color;
      } catch (_) {}
    }
    return undefined;
  }
  getEdgeColour(edge) {
    if (edge?.color !== undefined && edge.color !== null) return edge.color;
    const data = edge?.data ?? edge?.getData?.() ?? {};
    return data.color;
  }
  setEdgeColour(edge, colour) {
    if (typeof edge?.setColor !== "function") return false;
    try {
      edge.setColor(colour);
      return String(this.getEdgeColour(edge) ?? "") === String(colour);
    } catch (error) {
      console.warn("[CCGT Assistant] Could not set Canvas connection colour:", error);
      return false;
    }
  }
  syncEdgeColours(canvas) {
    if (this.syncingCanvases.has(canvas)) return;
    const nodes = canvas?.nodes;
    const edges = canvas?.edges;
    if (!nodes || !edges || typeof nodes.get !== "function" || typeof edges.values !== "function") return;
    let changed = false;
    let states = this.edgeStates.get(canvas);
    if (!states) {
      states = new Map();
      this.edgeStates.set(canvas, states);
    }
    const seenEdgeIds = new Set();
    this.syncingCanvases.add(canvas);
    try {
      for (const edge of edges.values()) {
        const edgeId = edge.id;
        if (!edgeId) continue;
        seenEdgeIds.add(edgeId);
        const destination = this.getDestination(edge, nodes);
        if (!destination) continue;
        const destinationId = destination.id;
        const destinationColour = this.getNodeColour(destination);
        if (destinationColour === undefined || destinationColour === null || destinationColour === "") continue;
        const previous = states.get(edgeId);
        const isNewEdge = !previous;
        const destinationChanged = previous && (previous.destinationId !== destinationId || String(previous.destinationColour ?? "") !== String(destinationColour));
        if (isNewEdge || destinationChanged) {
          const current = this.getEdgeColour(edge);
          if (String(current ?? "") !== String(destinationColour) && this.setEdgeColour(edge, destinationColour)) changed = true;
        }
        states.set(edgeId, { destinationId, destinationColour });
      }
      for (const edgeId of states.keys()) if (!seenEdgeIds.has(edgeId)) states.delete(edgeId);
      if (changed && typeof canvas.requestFrame === "function") canvas.requestFrame();
      if (changed && typeof canvas.requestSave === "function") canvas.requestSave();
    } catch (error) {
      console.error("[CCGT Assistant] Canvas connection colour synchronisation failed:", error);
    } finally {
      this.syncingCanvases.delete(canvas);
    }
  }

};
