/**
 * 运行时状态管理
 * 集中管理主题运行时的动态状态
 */

import type { Modes } from "./config";

// ============================================================================
// 运行时状态接口
// ============================================================================

export interface AsriRuntime {
  // 当前模式
  mode: Modes;

  // 国际化
  i18n: Record<string, string>;

  // 系统强调色
  sysAccentColor: string;

  // 灰度状态
  isSysAccentGray: boolean;
  isUserAccentGray: boolean;
  isCoverImgColorGray: boolean;

  // 跟随系统强调色
  followSysAccentColor: boolean;
}

// ============================================================================
// 运行时状态实现
// ============================================================================

export const runtime: AsriRuntime = {
  mode: "light",
  i18n: {},
  sysAccentColor: "",
  isSysAccentGray: false,
  isUserAccentGray: false,
  isCoverImgColorGray: false,
  followSysAccentColor: false,
};

// ============================================================================
// 便捷 setter
// ============================================================================

export function setMode(mode: Modes): void {
  runtime.mode = mode;
}

export function setI18n(i18nData: Record<string, string>): void {
  runtime.i18n = i18nData;
}

export function setSysAccentColor(color: string): void {
  runtime.sysAccentColor = color;
}

export function setIsSysAccentGray(value: boolean): void {
  runtime.isSysAccentGray = value;
}

export function setIsUserAccentGray(value: boolean): void {
  runtime.isUserAccentGray = value;
}

export function setIsCoverImgColorGray(value: boolean): void {
  runtime.isCoverImgColorGray = value;
}

export function setFollowSysAccentColor(value: boolean): void {
  runtime.followSysAccentColor = value;
}
