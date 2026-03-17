import { environment as env } from "../util/rsc";

type EnvClassifier = {
  condition: boolean | undefined;
  className: string;
};

const envClassifiers: EnvClassifier[] = [
  { condition: env.isMacOS, className: "body-asri--mac" },
  { condition: env.isLinux, className: "body-asri--linux" },
  { condition: env.isMobile, className: "body-asri--mobile" },
  { condition: env.isInBrowser, className: "body-asri--browser" },
  { condition: env.isAndroid, className: "body-asri--android" },
  { condition: env.isIOSApp, className: "body-asri--iosApp" },
  { condition: env.isReadOnly, className: "body-asri--readOnly" },
  { condition: env.isSafari, className: "body-asri--safari" },
];

export function addEnvClassNames() {
  envClassifiers.forEach(({ condition, className }) => {
    if (condition) {
      document.body.classList.add(className);
    }
  });

  document.documentElement.classList.remove(`asri-mode-dark`, `asri-mode-light`, 'is-rtl-lang');
  document.documentElement.classList.add(`asri-mode-${window.siyuan.config.appearance.mode > 0 ? "dark" : "light" as "dark" | "light"}`);

  if (env.lang === "ar_SA" || env.lang === "he_IL") {
    document.documentElement.classList.add("is-rtl-lang");
  }
}

export function removeEnvClassNames() {
  envClassifiers.forEach(({ className }) => {
    document.body.classList.remove(className);
  });

  document.documentElement.classList.remove(`asri-mode-dark`, `asri-mode-light`, "is-rtl-lang");
}
