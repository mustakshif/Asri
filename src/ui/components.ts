import { createElement } from './base';

// SVG图标组件
export const createSvgIcon = (options: SvgIconOptions): SVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('b3-menu__icon');
  
  const {
    viewBox = '0 0 24 24',
    width = '1em',
    height = '1em',
    fill = 'none',
    stroke = 'currentColor',
    strokeWidth = '2',
    pathData,
    useHref
  } = options;
  
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  
  if (useHref) {
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', useHref);
    svg.appendChild(use);
  } else if (pathData) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', fill);
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', strokeWidth);
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', pathData);
    svg.appendChild(path);
  }
  
  return svg;
};

// 菜单分隔符组件
export const createMenuSeparator = (options: BaseElementOptions = {}): HTMLButtonElement => {
  return createElement<HTMLButtonElement>('button', {
    ...options,
    className: ['b3-menu__separator', ...(Array.isArray(options.className) ? options.className : options.className ? [options.className] : [])]
  });
};

// 基础菜单项组件
export const createMenuItem = (options: MenuItemOptions): HTMLButtonElement => {
  const button = createElement<HTMLButtonElement>('button', {
    id: options.id,
    className: [
      'b3-menu__item',
      ...(options.type === 'custom' ? ['b3-menu__item--custom'] : []),
      ...(options.disabled ? ['b3-menu__item--disabled'] : []),
      ...(options.selected ? ['b3-menu__item--selected'] : []),
      ...(Array.isArray(options.className) ? options.className : options.className ? [options.className] : [])
    ],
    attributes: options.attributes,
    style: options.style,
    onClick: options.onClick
  });
  
  // 添加图标
  if (options.icon) {
    if (typeof options.icon === 'string') {
      button.appendChild(createSvgIcon({ useHref: options.icon }));
    } else {
      button.appendChild(options.icon);
    }
  }
  
  // 添加标签
  const label = createElement<HTMLSpanElement>('span', {
    className: 'b3-menu__label'
  });
  label.textContent = options.label;
  button.appendChild(label);
  
  // 添加快捷键
  if (options.accelerator) {
    const accelerator = createElement<HTMLSpanElement>('span', {
      className: 'b3-menu__accelerator'
    });
    accelerator.textContent = options.accelerator;
    button.appendChild(accelerator);
  }
  
  // 添加子菜单
  if (options.submenu && options.submenu.length > 0) {
    const rightIcon = createSvgIcon({ useHref: '#iconRight' });
    rightIcon.classList.add('b3-menu__icon--small');
    button.appendChild(rightIcon);
    
    const submenu = createSubmenu(options.submenu);
    button.appendChild(submenu);
  }
  
  return button;
};

// 子菜单组件
export const createSubmenu = (items: MenuItemOptions[]): HTMLDivElement => {
  const submenu = createElement<HTMLDivElement>('div', {
    className: 'b3-menu__submenu'
  });
  
  const itemsContainer = createElement<HTMLDivElement>('div', {
    className: 'b3-menu__items'
  });
  
  items.forEach(item => {
    if (item.type === 'separator') {
      itemsContainer.appendChild(createMenuSeparator({ className: item.className }));
    } else {
      itemsContainer.appendChild(createMenuItem(item));
    }
  });
  
  submenu.appendChild(itemsContainer);
  return submenu;
};

// 带输入框的菜单项
export const createMenuItemWithInput = (
  options: MenuItemOptions & {
    inputType: 'color' | 'range' | 'checkbox';
    inputValue?: string;
    inputAttributes?: Record<string, string>;
  }
): HTMLButtonElement => {
  const button = createMenuItem(options);
  
  const input = createElement<HTMLInputElement>('input', {
    id: options.inputAttributes?.id,
    attributes: {
      type: options.inputType,
      value: options.inputValue || '',
      ...options.inputAttributes
    }
  });
  
  // 根据输入类型调整布局
  if (options.inputType === 'color') {
    button.querySelector('.b3-menu__icon')?.remove();
    button.insertBefore(input, button.firstChild);
  } else if (options.inputType === 'range') {
    const tooltipDiv = createElement<HTMLDivElement>('div', {
      className: 'b3-tooltips b3-tooltips__n',
      attributes: { 'aria-label': options.label }
    });
    input.classList.add('b3-slider', 'fn__block');
    tooltipDiv.appendChild(input);
    button.appendChild(tooltipDiv);
  }
  
  return button;
};
