// 导入 CSS 文件，这样会被 Vite 打包进库中
import './app/globals.css';

// export { joinRoom } from '@/registry/examples/kk-adapt-hooks/roomManage';
// export  { useLocale } from '@/hooks/useLocale';
// export  { getI18nValues } from '@/i18n/getI18nValues';
// export { EditorKit } from '@/kk-adapt-plugin-kit';
// export { CopilotKit } from '@/registry/components/editor/plugins/copilot-kit';
// export { Editor, EditorContainer } from '@/registry/ui/editor';


export { EditorKit } from '@/kk-adapt-plugin-kit';
export { Editor, EditorContainer } from '@/registry/ui/editor';
export { ShareDBPlugin } from '@platejs/sharedb/react';

export { TrailingBlockPlugin } from '@platejs/utils-custom'
export { KEYS, NormalizeTypesPlugin } from 'platejs';
export { Plate, usePlateEditor } from 'platejs/react';

