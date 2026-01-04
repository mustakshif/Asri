import { getBlockAttrs, setBlockAttrs } from "../utils/api";
import { querySelectorAsync } from "../utils/misc";
import { wndElements } from "../utils/interfaceState";
import { runtime, loadI18n, getI18nText } from "../core/config";

const afwdBlockTypes = ["NodeParagraph", "NodeTable", "NodeAttributeView", "NodeSuperBlock", "NodeVideo", "NodeWidget", "NodeIFrame"];

let commonMenuEl: Element | undefined;
let i18n: Record<string, string> | undefined;

// ============================================================================
// HTML Template Functions
// ============================================================================

function getInDocBlockMenuItems(i18nData: Record<string, string>): string {
  return `
    <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-on">
      <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g>
      </svg>
      <span class="b3-menu__label">${i18nData["afwdMenuItem-on"]}</span>
    </button>
    <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-off">
      <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9l-6 6m0-6l6 6"/></g>
      </svg>
      <span class="b3-menu__label">${i18nData["afwdMenuItem-off"]}</span>
    </button>
  `;
}

function getDocAfwdMenuItem(id: string, iconId: string, label: string): string {
  return `
    <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-${id}">
      <span class="b3-menu__label">
        <div class="fn__flex">
          <svg class="b3-menu__icon" style=""><use xlink:href="#${iconId}"></use></svg>
          <span>${label}</span>
          <span class="fn__space fn__flex-1"></span>
          <input type="checkbox" class="b3-switch fn__flex-center">
        </div>
      </span>
    </button>
  `;
}

function getDocMenuItems(i18nData: Record<string, string>): string {
  const items = [
    { id: "all", icon: "", label: i18nData["afwdMenuItem-all"] },
    { id: "db", icon: "iconDatabase", label: i18nData["afwdMenuItem-db"] },
    { id: "t", icon: "iconTable", label: i18nData["afwdMenuItem-t"] },
    { id: "p", icon: "iconImage", label: i18nData["afwdMenuItem-p"] },
    { id: "iframe", icon: "iconHTML5", label: i18nData["afwdMenuItem-iframe"] },
    { id: "sb", icon: "iconSuper", label: i18nData["afwdMenuItem-sb"] },
  ];
  return items.map(item => getDocAfwdMenuItem(item.id, item.icon, item.label)).join("");
}

function getTdirMenuItems(i18nData: Record<string, string>): string {
  return `
    <button class="b3-menu__item b3-menu__item--custom" id="tdirMenuItem-ltr">
      <svg class="b3-menu__icon" style=""><use xlink:href="#iconLtr"></use></svg>
      <span class="b3-menu__label">${i18nData["tdirMenuItem-ltr"]}</span>
    </button>
    <button class="b3-menu__item b3-menu__item--custom" id="tdirMenuItem-rtl">
      <svg class="b3-menu__icon" style=""><use xlink:href="#iconRtl"></use></svg>
      <span class="b3-menu__label">${i18nData["tdirMenuItem-rtl"]}</span>
    </button>
  `;
}

function getAfwdMenuButtonHtml(blockType: string, i18nData: Record<string, string>): string {
  const submenuItems = blockType === "doc" ? getDocMenuItems(i18nData) : getInDocBlockMenuItems(i18nData);
  return `
    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 18 18">
      <path fill="currentColor" d="m15.503 15.003l-.735.71a.75.75 0 1 0 1.042 1.078l1.886-1.82a1 1 0 0 0 0-1.44l-1.886-1.82a.75.75 0 0 0-1.042 1.079l.739.713H12.75a.75.75 0 0 0 0 1.5zM15 3a2 2 0 0 1 2 2v4.25a.75.75 0 0 1-1.5 0V5a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5v4.25a.75.75 0 0 1-1.5 0V5a2 2 0 0 1 2-2zM5.234 15.712l-.735-.71h2.752a.75.75 0 1 0 0-1.5H4.495l.739-.713a.75.75 0 0 0-1.042-1.078l-1.886 1.82a1 1 0 0 0 0 1.44l1.886 1.82a.75.75 0 0 0 1.042-1.079"/>
    </svg>
    <span class="b3-menu__label">${i18nData["afwdDocMenuLabel"]}</span>
    <svg class="b3-menu__icon b3-menu__icon--small"><use xlink:href="#iconRight"></use></svg>
    <div class="b3-menu__submenu">
      <div class="b3-menu__items">
        ${submenuItems}
        <button class="b3-menu__separator"></button>
        <button class="b3-menu__item" id="afwdMenuItem-clear">
          <svg class="b3-menu__icon" style=""><use xlink:href="#iconTrashcan"></use></svg>
          <span class="b3-menu__label">${i18nData["afwdMenuItem-clear"]}</span>
        </button>
      </div>
    </div>
  `;
}

function getTdirMenuButtonHtml(i18nData: Record<string, string>): string {
  return `
    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 22 22">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 5h-3m-5 0h5m-5 0v10m0-10h-1c-1.667 0-5 1-5 5s3.333 5 5 5h1m0 4v-4m5 4V5"/>
    </svg>
    <span class="b3-menu__label">${i18nData["tdirDocMenuLabel"]}</span>
    <svg class="b3-menu__icon b3-menu__icon--small"><use xlink:href="#iconRight"></use></svg>
    <div class="b3-menu__submenu">
      <div class="b3-menu__items">
        ${getTdirMenuItems(i18nData)}
        <button class="b3-menu__separator"></button>
        <button class="b3-menu__item" id="tdirMenuItem-clear">
          <svg class="b3-menu__icon" style=""><use xlink:href="#iconTrashcan"></use></svg>
          <span class="b3-menu__label">${i18nData["afwdMenuItem-clear"]}</span>
        </button>
      </div>
    </div>
  `;
}

function createMenuButton(htmlContent: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.className = "b3-menu__item";
  btn.innerHTML = htmlContent;
  return btn;
}

function insertMenuItem(menuList: HTMLDivElement, btn: HTMLButtonElement, separator?: HTMLButtonElement): void {
  menuList.insertBefore(separator || btn, menuList.lastChild?.previousSibling!);
  if (separator) menuList.insertBefore(btn, separator);
}

// ============================================================================
// Main Entry Point
// ============================================================================

export async function addAfwdMenuItems(e: Event) {
  if (e.type !== "mouseup") return;
  if (!i18n || Object.keys(i18n).length === 0) {
    i18n = await loadI18n();
  }
  const target = e.target as HTMLElement;
  const targetLabel = target.closest(".ariaLabel") as HTMLElement;
  if (!targetLabel) return;
  const gutterType = targetLabel.dataset.type;
  const nonGutterType = target.closest(".protyle-title__icon")
    ? "doc"
    : targetLabel.dataset.type === "doc" ? "doc" : undefined;
  const type = afwdBlockTypes.includes(gutterType!) ? gutterType : nonGutterType;
  if (!type) return;
  const blockId = type === "doc"
    ? targetLabel.parentElement!.dataset["nodeId"] ?? (targetLabel.closest(".protyle")?.querySelector(".protyle-title") as HTMLElement)?.dataset["nodeId"]
    : targetLabel.dataset["nodeId"];
  commonMenuEl = await querySelectorAsync("#commonMenu:not(.fn__none)");
  await new Promise((resolve) => setTimeout(resolve, 0));
  initializeCurBlocksAttrs(type, blockId as string, i18n!);
}

// ============================================================================
// Menu Initialization
// ============================================================================

async function initializeCurBlocksAttrs(curBlockType: string, curBlockId: string, i18nData: Record<string, string>) {
  const isDoc = curBlockType === "doc";
  createMenuItems(curBlockType, i18nData);
  await applyInitialStates(isDoc, curBlockId);
  setupMenuFunctionalities(isDoc, curBlockId);
}

function createMenuItems(blockType: string, i18nData: Record<string, string>): void {
  if (!commonMenuEl || document.getElementById("afwdMenuItem-clear")) return;
  const commonMenuBtnList = commonMenuEl.lastChild as HTMLDivElement;

  const afwdEntryBtn = createMenuButton(getAfwdMenuButtonHtml(blockType, i18nData));
  const separator = document.createElement("button");
  separator.className = "b3-menu__separator";
  insertMenuItem(commonMenuBtnList, afwdEntryBtn, separator);

  if (blockType === "doc") {
    const tdirEntryBtn = createMenuButton(getTdirMenuButtonHtml(i18nData));
    insertMenuItem(commonMenuBtnList, tdirEntryBtn);
  }
}

async function applyInitialStates(isDoc: boolean, curBlockId: string): Promise<void> {
  const attrs = await getBlockAttrs(curBlockId);
  if (!attrs) return;

  let afwdAttrs = attrs["custom-afwd"] || "";
  let tdirAttr = attrs["custom-tdir"] || "";
  const afwdAttrsArray = afwdAttrs.split(" ").filter(Boolean);

  if (isDoc) {
    applyDocInitialState(afwdAttrsArray, tdirAttr);
  } else {
    applyInDocInitialState(afwdAttrsArray);
  }
}

function applyDocInitialState(afwdAttrs: string[], tdirAttr: string): void {
  afwdAttrs.forEach((attr: string) => {
    const menuItemEl = document.getElementById(`afwdMenuItem-${attr}`);
    if (menuItemEl) {
      menuItemEl.querySelector("input")!.checked = true;
    }
  });

  if (afwdAttrs.includes("all")) {
    const menuItemEls = commonMenuEl?.querySelectorAll("button[id^=afwdMenuItem]:not(#afwdMenuItem-all, #afwdMenuItem-clear)");
    menuItemEls?.forEach((el) => {
      el.classList.add("b3-menu__item--disabled");
      el.querySelector("input")!.disabled = true;
    });
  }

  if (tdirAttr) {
    const menuItemEl = document.getElementById(`tdirMenuItem-${tdirAttr}`);
    if (menuItemEl) {
      menuItemEl.classList.add("b3-menu__item--selected");
    }
  }
}

function applyInDocInitialState(afwdAttrs: string[]): void {
  if (afwdAttrs.length > 0) {
    const menuItemEl = document.getElementById(`afwdMenuItem-${afwdAttrs[0]}`);
    if (menuItemEl) {
      menuItemEl.classList.add("b3-menu__item--selected");
    }
  }
}

// ============================================================================
// Menu Functionalities
// ============================================================================

function setupMenuFunctionalities(isDoc: boolean, curBlockId: string): void {
  const afwdMenuItemEls = commonMenuEl?.querySelectorAll("button[id^=afwdMenuItem]:not(#afwdMenuItem-clear)") as NodeListOf<HTMLButtonElement>;
  const tdirMenuItemEls = commonMenuEl?.querySelectorAll("button[id^=tdirMenuItem]:not(#tdirMenuItem-clear)") as NodeListOf<HTMLButtonElement>;

  if (isDoc) {
    setupDocAfwdHandlers(afwdMenuItemEls, curBlockId);
    setupTdirHandlers(tdirMenuItemEls, curBlockId);
  } else {
    setupInDocAfwdHandlers(afwdMenuItemEls, curBlockId);
  }

  setupClearButtons(isDoc, afwdMenuItemEls, tdirMenuItemEls, curBlockId);
}

function setupDocAfwdHandlers(menuItems: NodeListOf<HTMLButtonElement>, curBlockId: string): void {
  const menuItemsExceptAll = [...menuItems].filter((el) => el.id !== "afwdMenuItem-all");
  let groupedAttrsReserved: string[] = [];
  let currentAttrs: string[] = [];

  menuItems.forEach((el) => {
    el.onclick = (ev) => {
      if (el.classList.contains("b3-menu__item--disabled")) return;
      const input = el.querySelector("input")!;
      const curAttrItem = el.id.split("-")[1];
      let isOn = input.checked;

      if (ev.target === input) isOn = !isOn;
      else input.checked = !isOn;

      if (isOn) {
        if (curAttrItem === "all") {
          menuItemsExceptAll.forEach((item) => {
            item.classList.remove("b3-menu__item--disabled");
            item.querySelector("input")!.disabled = false;
          });
          currentAttrs = groupedAttrsReserved.length > 0 ? groupedAttrsReserved : [];
        } else {
          currentAttrs = currentAttrs.filter((a) => a !== curAttrItem);
        }
      } else {
        if (curAttrItem === "all") {
          if (!currentAttrs.includes("all")) groupedAttrsReserved = currentAttrs;
          currentAttrs = ["all"];
          menuItemsExceptAll.forEach((item) => {
            item.classList.add("b3-menu__item--disabled");
            item.querySelector("input")!.disabled = true;
          });
        } else {
          currentAttrs.push(curAttrItem);
        }
      }

      setBlockAttrs(curBlockId, { "custom-afwd": currentAttrs.join(" ") || "" });
    };
  });
}

function setupTdirHandlers(menuItems: NodeListOf<HTMLButtonElement>, curBlockId: string): void {
  let currentAttrs: string[] = [];

  menuItems.forEach((el, index, arr) => {
    el.onclick = () => {
      const attr = el.id.split("-")[1];
      const isSelected = el.classList.contains("b3-menu__item--selected");

      if (isSelected) {
        currentAttrs = [];
        el.classList.remove("b3-menu__item--selected");
      } else {
        currentAttrs = [attr];
        el.classList.add("b3-menu__item--selected");
        arr[1 - index].classList.remove("b3-menu__item--selected");
      }

      setBlockAttrs(curBlockId, { "custom-tdir": currentAttrs.join("") });
    };
  });
}

function setupInDocAfwdHandlers(menuItems: NodeListOf<HTMLButtonElement>, curBlockId: string): void {
  let currentAttrs: string[] = [];

  menuItems.forEach((el, index, arr) => {
    el.onclick = () => {
      const attr = el.id.split("-")[1];
      const isSelected = el.classList.contains("b3-menu__item--selected");

      if (isSelected) {
        currentAttrs = [];
        el.classList.remove("b3-menu__item--selected");
      } else {
        currentAttrs = [attr];
        el.classList.add("b3-menu__item--selected");
        arr[1 - index].classList.remove("b3-menu__item--selected");
      }

      setBlockAttrs(curBlockId, { "custom-afwd": currentAttrs.join(" ") || "" });
    };
  });
}

function setupClearButtons(
  isDoc: boolean,
  afwdMenuItems: NodeListOf<HTMLButtonElement>,
  tdirMenuItems: NodeListOf<HTMLButtonElement>,
  curBlockId: string
): void {
  const afwdClearBtn = document.getElementById("afwdMenuItem-clear");
  if (!afwdClearBtn) return;

  afwdClearBtn.onclick = () => {
    setBlockAttrs(curBlockId, { "custom-afwd": "" });
    afwdMenuItems.forEach((el) => {
      el.classList.remove("b3-menu__item--disabled", "b3-menu__item--selected");
      if (isDoc) {
        const inputEl = el.querySelector("input");
        if (inputEl) {
          inputEl.disabled = false;
          inputEl.checked = false;
        }
      }
    });
  };

  if (!isDoc) return;
  const tdirClearBtn = document.getElementById("tdirMenuItem-clear");
  if (!tdirClearBtn) return;

  tdirClearBtn.onclick = () => {
    setBlockAttrs(curBlockId, { "custom-tdir": "" });
    tdirMenuItems.forEach((el) => {
      el.classList.remove("b3-menu__item--selected");
    });
  };
}
