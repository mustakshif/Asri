import { environment as env } from "../util/rsc";

type EnvClassifier = {
  condition: boolean | undefined;
  className: string;
};

const envClassifiers: EnvClassifier[] = [
  { condition: env.isMacOS, className: 'body--mac' },
  { condition: env.isLinux, className: 'body--linux' },
  { condition: env.isMobile, className: 'body--mobile' },
  { condition: env.isInBrowser, className: 'body--browser' },
  { condition: env.isAndroid, className: 'body--android' },
  { condition: env.isIOSApp, className: 'body--iosApp' },
];

export function addEnvClassNames() {
  envClassifiers.forEach(({ condition, className }) => {
    if (condition) {
      document.body.classList.add(className);
    }
  });
}

export function removeEnvClassNames() {
  envClassifiers.forEach(({ className }) => {
    document.body.classList.remove(className);
  });
}