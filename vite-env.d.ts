import { SFCWithInstall } from "element-plus/es/utils/index.mjs";
import { NotifyType } from "./src/utils/elementPlus";
import { IElMessageBox } from "element-plus";

/// <reference types="vite/client" />
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uuid'
declare module 'qiankun' {
  export function registerMicroApps(apps: any[]): void;
  export function start(options?: any): void;
}
declare global {
  interface Window {
    $notify: (title: string, message: string, type: NotifyType) => void,
    $messageBox: SFCWithInstall<IElMessageBox>
  }
}