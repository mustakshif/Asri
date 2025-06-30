import { getFile, putFile } from "../../util/api";
import { environment as env } from "../../util/rsc";
import { setFollowSysAccentColor } from "./state";

export const asriConfigs: AsriConfigs = {
  "light": {
    "followSysAccentColor": false,
    "followCoverImgColor":false,
    "chroma": "1",
    "userCustomColor": "#3478f6",
    "coverImgColor": "",
    "presetPalette": "",
  },
  "dark": {
    "followSysAccentColor": false,
    "followCoverImgColor":false,
    "chroma": "1",
    "userCustomColor": "#3478f6",
    "coverImgColor": "",
    "presetPalette": "",
  },
  "features": {
    "tfp": "",
  },
};

export async function getLocalConfigs() {
  console.log("curMode", env.appSchemeMode);
  await getFile("/data/snippets/Asri.config.json")
    .then((response) => {
      if (response && response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((data) => {
      if (!data) {
        return;
      }

      // 如果本地配置缺失数据，则赋与默认值
      for (let key in asriConfigs) {
        if (!(key in data)) {
          data[key] = asriConfigs[key as keyof typeof asriConfigs];
        }
      }

      const modes: Modes[] = ["light", "dark"];
      for (const mode of modes) {
        asriConfigs[mode].followSysAccentColor = !!data[mode].followSysAccentColor;
        asriConfigs[mode].followCoverImgColor = !!data[mode].followCoverImgColor;
        asriConfigs[mode].chroma = data[mode].chroma ?? "1";
        asriConfigs[mode].userCustomColor = data[mode].userCustomColor ?? "#3478f6";
        asriConfigs[mode].presetPalette = data[mode].presetPalette ?? "";
      }
      asriConfigs.features = data.features;
      setFollowSysAccentColor(!!data[env.appSchemeMode].followSysAccentColor);
    });
}

export async function updateAsriConfigs() {
  await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
} 