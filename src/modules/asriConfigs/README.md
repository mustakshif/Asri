# Asri 配置模块

这个文件夹包含了 Asri 主题的配置管理功能，已经从原来的大文件拆分成多个模块以提高可维护性。

## 模块结构

### 核心模块
- `core.ts` - 主要的加载和卸载功能
- `index.ts` - 统一导出文件，提供对外API

### 功能模块
- `cssVarManager.ts` - CSS变量管理器
- `configs.ts` - 配置文件读写和管理
- `palettes.ts` - 预设色板数据
- `systemColor.ts` - 系统颜色处理
- `i18n.ts` - 国际化支持

### 界面模块
- `menuItems.ts` - 菜单项创建和管理
- `eventHandlers.ts` - 事件处理函数
- `state.ts` - 状态管理

### 工具模块
- `types.ts` - TypeScript类型定义

## 使用方法

### 基本使用
```typescript
import { loadThemePalette, unloadThemePalette } from './asriConfigs';

// 加载主题配置
await loadThemePalette();

// 卸载主题配置
unloadThemePalette();
```

### 菜单功能
```typescript
import { createBarModeMenuItems } from './asriConfigs';

// 创建菜单项
element.addEventListener('mouseup', createBarModeMenuItems);
```

### 事件监听
```typescript
import { 
  tfpMenuItemCallbackEventListener, 
  paletteMenuItemClickEventListener 
} from './asriConfigs';

// 注册事件监听器
tfpMenuItemCallbackEventListener.register();
paletteMenuItemClickEventListener.register();
```

## 向后兼容性

原来的 `asriPalettes.ts` 文件已经更新为导出这些模块的内容，因此现有的导入语句不需要修改即可继续工作：

```typescript
// 这些导入仍然有效
import { loadThemePalette, i18n, followSysAccentColor } from './asriPalettes';
``` 