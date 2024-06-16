import { environment as env } from "../util/rsc";

type EnvClassifier = {
  condition: boolean | undefined;
  className: string;
};

const envClassifiers: EnvClassifier[] = [
  { condition: env.isMacOS, className: 'body-asri--mac' },
  { condition: env.isLinux, className: 'body-asri--linux' },
  { condition: env.isMobile, className: 'body-asri--mobile' },
  { condition: env.isInBrowser, className: 'body-asri--browser' },
  { condition: env.isAndroid, className: 'body-asri--android' },
  { condition: env.isIOSApp, className: 'body-asri--iosApp' },
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