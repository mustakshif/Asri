import { remote } from "../../util/electron";
import { hexToHSL } from "../../util/colorTools";
import { environment as env } from "../../util/rsc";
import { cssVarManager } from "./cssVarManager";
import { setSysAccentColor, setIsSysAccentGray, followSysAccentColor, sysAccentColor, colorPicker } from "./state";
import { handleGrayScale, reverseOnPrimaryLightness } from "./util";

export function getSystemAccentColor() {
  if (env.isInBrowser || env.isMobile || env.isLinux) return;

  const accent = remote.systemPreferences.getAccentColor();
  const accentHex = "#" + accent.slice(0, 6);
  const accentHsl = hexToHSL(accentHex);
  if (!accentHsl) return;
  
  if (sysAccentColor !== accentHex) {
    cssVarManager.setProperty("--asri-sys-accent", accentHex);
    if (accentHsl.s > 0.28) cssVarManager.setProperty("--asri-sys-accent-accessible", accentHex);
    else cssVarManager.removeProperty("--asri-sys-accent-accessible");

    setIsSysAccentGray(accentHsl.s === 0 ? true : false);

    setSysAccentColor(accentHex);
  }

  if (followSysAccentColor) {
    handleGrayScale(accentHsl.s);
    reverseOnPrimaryLightness(accentHex);
  }
}
