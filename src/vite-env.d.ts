import { SFCWithInstall } from "element-plus/es/utils/index.mjs";
import { NotifyType } from "./utils/elementPlus";
import { IElMessageBox } from "element-plus";

/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uuid'
declare module '*.scss' {
  export default any
}
declare global {
  interface Window {
    $notify: (title: string, message: string, type: NotifyType) => void,
    $messageBox: SFCWithInstall<IElMessageBox>
  }
}