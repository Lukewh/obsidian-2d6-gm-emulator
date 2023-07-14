import { App, Plugin, SuggestModal, Notice, Editor } from "obsidian";

import { LIKELIHOOD, question, ReturnString } from "./oracle/common";
import { yesNo } from "./oracle/yesNo";
import { encounter } from "./oracle/encounter";

export class LikelihoodModal extends SuggestModal<string> {
  onSubmit: (result: string) => void;

  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
    this.contentEl.createEl("h1", { text: "What's the likelihood?" });
  }

  getSuggestions(query: string): string[] {
    return Object.values(LIKELIHOOD).filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderSuggestion(item: string, el: HTMLElement): void {
    el.createEl("div", { text: item });
  }

  onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent): void {
    this.onSubmit(item);
  }
}

export default class GMEmulator extends Plugin {
  writeResult(
    editor: Editor,
    fn: (mod: number) => ReturnString,
    result: string
  ) {
    const res = question(result as LIKELIHOOD, fn);
    new Notice(`Answer: ${res}`);
    const cursor = editor.getCursor();
    const resultWithEmphasis = `**${res}**`;
    editor.replaceRange(resultWithEmphasis, cursor);
    editor.setCursor(cursor.line, cursor.ch + resultWithEmphasis.length);
  }

  async onload() {
    console.log("loading plugin");
    this.addCommand({
      id: "gm-oracle-yes-no",
      name: "Oracle: Yes/No",
      editorCallback: (editor: Editor) => {
        new LikelihoodModal(this.app, (result) => {
          this.writeResult(editor, yesNo, result);
        }).open();
      },
    });

    this.addCommand({
      id: "gm-oracle-encounter",
      name: "Oracle: Encounter",
      editorCallback: (editor: Editor) => {
        new LikelihoodModal(this.app, (result) => {
          this.writeResult(editor, encounter, result);
        }).open();
      },
    });
  }

  onunload() {
    console.log("unloading plugin");
  }
}
