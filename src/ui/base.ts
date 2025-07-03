export const createElement = <T extends HTMLElement>(
  tagName: string,
  options: BaseElementOptions = {}
): T => {
  const element = document.createElement(tagName) as T;
  
  if (options.id) element.id = options.id;
  
  if (options.className) {
    const classes = Array.isArray(options.className) 
      ? options.className 
      : [options.className];
    element.classList.add(...classes);
  }
  
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  
  if (options.style) {
    Object.assign(element.style, options.style);
  }
  
  if (options.onClick) {
    element.addEventListener('click', options.onClick);
  }
  
  return element;
};

export const createFragment = (html: string): DocumentFragment => {
  return document.createRange().createContextualFragment(html);
};
