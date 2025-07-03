import { createMenuItem, createMenuSeparator, createSvgIcon } from './components';

// 调色板菜单项生成器
export const createPaletteMenuItems = (
  palettes: Record<string, any>,
  i18n: Record<string, string>
): HTMLButtonElement[] => {
  return Object.keys(palettes).map(paletteID => 
    createMenuItem({
      id: paletteID,
      label: i18n[paletteID] || paletteID,
      className: 'asri-config',
      icon: createSvgIcon({
        viewBox: '0 0 24 24',
        pathData: 'M19 3h-4a2 2 0 0 0-2 2v12a4 4 0 0 0 8 0V5a2 2 0 0 0-2-2m-6 4.35l-2-2a2 2 0 0 0-2.828 0L5.344 8.178a2 2 0 0 0 0 2.828l9 9M7.3 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12m0-4v.01'
      })
    })
  );
};

// 菜单构建器类
export class MenuBuilder {
  private items: (HTMLButtonElement | HTMLDivElement)[] = [];
  
  addSeparator(className?: string): this {
    this.items.push(createMenuSeparator({ className }));
    return this;
  }
  
  addItem(options: MenuItemOptions): this {
    this.items.push(createMenuItem(options));
    return this;
  }
  
  addSubtitle(text: string, style?: Partial<CSSStyleDeclaration>): this {
    const subtitle = document.createElement('div');
    subtitle.className = 'menu-item__subtitle';
    subtitle.textContent = text;
    subtitle.style.userSelect = 'none';
    if (style) Object.assign(subtitle.style, style);
    this.items.push(subtitle);
    return this;
  }
  
  addCustomElement(elements: HTMLButtonElement[] | HTMLDivElement[]): this {
    this.items.push(...elements);
    return this;
  }
  
  build(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    this.items.forEach(item => fragment.appendChild(item));
    return fragment;
  }
  
  appendTo(container: Element): void {
    container.appendChild(this.build());
  }
  
  clear(): this {
    this.items = [];
    return this;
  }
}
