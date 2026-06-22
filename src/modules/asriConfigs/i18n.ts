import { environment as env } from "../../util/rsc";

const langMap: Record<string, string> = {
  "zh-CN": "zh_CN",
  "zh-TW": "zh_CHT",
  "en": "en_US",
  "ar": "ar_SA",
};

export async function loadI18n() {
  let res: Response;
  try {
    console.log("loading i18n for lang:", env.lang, typeof env.lang);
    if (["zh-CN", "zh-TW", "en", "ar"].includes(env.lang)) {
      res = await fetch(`/appearance/themes/Asri/i18n/${langMap[env.lang]}.json`);
    } else {
      res = await fetch("/appearance/themes/Asri/i18n/en_US.json");
    }

    const i18n = await res.json();
    console.log("i18n:", i18n);
    return i18n;
  } catch (error) {
    console.error("failed to load i18n:", error);
    throw error;
  }
} 