import { toPlatePlugin } from 'platejs/react';

import { BaseOtPlugin } from '../lib/BaseOtPlugin';

/** 
 * 启用 ShareDB 实时协作编辑支持的 sharedb 插件 
 */
export const ShareDBPlugin = toPlatePlugin(BaseOtPlugin); 