export class CSSVarManager {
  private static instance: CSSVarManager;
  private styleElement: HTMLStyleElement;
  private pendingUpdates: Map<string, string>;
  private rafId: number | null = null;
  private existingVars: Map<string, string>;

  private constructor() {
    // 检查是否已存在style元素
    const existingStyle = document.getElementById("snippetCSS-asri-root-vars") as HTMLStyleElement;
    if (existingStyle) {
      this.styleElement = existingStyle;
      // 解析现有的CSS变量
      this.existingVars = this.parseExistingVars();
    } else {
      this.styleElement = document.createElement("style");
      this.styleElement.id = "snippetCSS-asri-root-vars";
      document.head.appendChild(this.styleElement);
      this.existingVars = new Map();
    }
    this.pendingUpdates = new Map();
  }

  private parseExistingVars(): Map<string, string> {
    const vars = new Map<string, string>();
    const cssText = this.styleElement.textContent;
    if (!cssText) return vars;

    // 解析:root中的CSS变量
    const rootMatch = cssText.match(/:root\s*{([^}]*)}/);
    if (rootMatch) {
      const varDeclarations = rootMatch[1].split(";");
      for (const declaration of varDeclarations) {
        const [name, value] = declaration.split(":").map((s) => s.trim());
        if (name && value) {
          vars.set(name, value);
        }
      }
    }
    return vars;
  }

  public static getInstance(): CSSVarManager {
    if (!CSSVarManager.instance) {
      CSSVarManager.instance = new CSSVarManager();
    }
    return CSSVarManager.instance;
  }

  public setProperty(name: string, value: string) {
    this.pendingUpdates.set(name, value);
    this.scheduleUpdate();
  }

  public removeProperty(name: string) {
    this.pendingUpdates.set(name, "");
    this.scheduleUpdate();
  }

  private scheduleUpdate() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => this.applyUpdates());
  }

  private applyUpdates() {
    if (this.pendingUpdates.size === 0) return;

    let cssText = ":root {";

    // 合并现有变量和待更新变量
    const allVars = new Map([...this.existingVars, ...this.pendingUpdates]);

    allVars.forEach((value, name) => {
      if (value === "") {
        this.existingVars.delete(name);
      } else {
        cssText += `${name}: ${value};`;
        this.existingVars.set(name, value);
      }
    });

    cssText += "}";
    this.styleElement.textContent = cssText;
    this.pendingUpdates.clear();
    this.rafId = null;
  }

  // 获取当前所有CSS变量的值
  public getAllVars(): Map<string, string> {
    return new Map(this.existingVars);
  }
}

export const cssVarManager = CSSVarManager.getInstance(); 