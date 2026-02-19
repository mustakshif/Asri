import { asriConfigs, updateAsriConfigs } from "./asriConfigs";

export interface CSSSnippetDefinition {
  id: string;
  cssText: string;
}

const STYLE_ID_PREFIX = "asri-css-loader-";

function toStyleElementId(snippetId: string) {
  return `${STYLE_ID_PREFIX}${snippetId}`;
}

export class CSSLoaderService {
  private snippetRegistry = new Map<string, CSSSnippetDefinition>();

  register(definition: CSSSnippetDefinition) {
    this.snippetRegistry.set(definition.id, definition);
  }

  unregister(snippetId: string) {
    this.unload(snippetId);
    this.snippetRegistry.delete(snippetId);
  }

  isLoaded(snippetId: string) {
    return !!document.getElementById(toStyleElementId(snippetId));
  }

  load(snippetId: string) {
    const definition = this.snippetRegistry.get(snippetId);
    if (!definition || this.isLoaded(snippetId)) return false;

    const styleElement = document.createElement("style");
    styleElement.id = toStyleElementId(snippetId);
    styleElement.textContent = definition.cssText;
    document.head.appendChild(styleElement);
    return true;
  }

  unload(snippetId: string) {
    const styleElement = document.getElementById(toStyleElementId(snippetId));
    if (!styleElement) return false;
    styleElement.remove();
    return true;
  }

  unloadAll() {
    document.querySelectorAll(`[id^="${STYLE_ID_PREFIX}"]`).forEach((styleElement) => {
      styleElement.remove();
    });
  }

  async setEnabled(snippetId: string, enabled: boolean, persist = true) {
    enabled ? this.load(snippetId) : this.unload(snippetId);
    this.updateEnabledSnippetList(snippetId, enabled);
    if (persist) await updateAsriConfigs();
  }

  async restoreEnabledSnippets() {
    if (!asriConfigs.features.cssLoader.enabled) return;
    const enabledSnippets = asriConfigs.features.cssLoader.enabledSnippets;
    for (const snippetId of enabledSnippets) {
      this.load(snippetId);
    }
  }

  private updateEnabledSnippetList(snippetId: string, enabled: boolean) {
    const current = asriConfigs.features.cssLoader.enabledSnippets;
    if (enabled) {
      if (!current.includes(snippetId)) current.push(snippetId);
      return;
    }
    asriConfigs.features.cssLoader.enabledSnippets = current.filter((id) => id !== snippetId);
  }
}

export const cssLoaderService = new CSSLoaderService();
