import { environment as env } from "../../util/rsc";

export async function loadI18n() {
  let res: Response;
  try {
    console.log("loading i18n for lang:", env.lang, typeof env.lang);
    if (["zh-CN", "zh-CHT", "en-US", "ar-SA"].includes(env.lang)) {
      res = await fetch(`/appearance/themes/Asri/i18n/${env.lang.replace("-", "_")}.json`);
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