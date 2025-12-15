
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-tel-input' {
  import { App } from 'vue'
  const VueTelInput: any
  export default VueTelInput
  export function install(app: App, options?: any): void
}
