import { environment as env } from "../../util/rsc";

export async function loadI18n() {
  let res: Response;
  try {
    if (["zh_CN", "zh_CHT", "en_US", "ar_SA"].includes(env.lang)) {
      res = await fetch(`/appearance/themes/Asri/i18n/${env.lang}.json`);
    } else {
      res = await fetch("/appearance/themes/Asri/i18n/en_US.json");
    }

    const i18n = await res.json();
    return i18n;
  } catch (error) {
    console.error("failed to load i18n:", error);
    throw error;
  }
} 