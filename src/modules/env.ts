import { environment as env } from "../util/rsc";

type EnvClassifier = {
  condition: boolean | undefined | string;
  className: string;
  node: HTMLElement;
};

const envClassifiers: EnvClassifier[] = [
  { condition: env.isMacOS, className: "body-asri--mac", node: document.body },
  { condition: env.isLinux, className: "body-asri--linux", node: document.body },
  { condition: env.isMobile, className: "body-asri--mobile", node: document.body },
  { condition: env.isInBrowser, className: "body-asri--browser", node: document.body },
  { condition: env.isAndroid, className: "body-asri--android", node: document.body },
  { condition: env.isIOSApp, className: "body-asri--iosApp", node: document.body },
  { condition: env.isReadOnly, className: "body-asri--readOnly", node: document.body },
  { condition: env.isSafari, className: "body-asri--safari", node: document.body },
  { condition: env.appSchemeMode, className: env.appSchemeMode === "light" ? "asri-mode-light" : "asri-mode--dark", node: document.documentElement },
];

export function addEnvClassNames() {
  envClassifiers.forEach(({ condition, className, node }) => {
    if (condition) {
      node.classList.add(className);
    }
  });
}

export function removeEnvClassNames() {
  envClassifiers.forEach(({ className, node }) => {
    node.classList.remove(className);
  });
}
