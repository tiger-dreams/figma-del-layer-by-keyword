import { EventHandler } from '@create-figma-plugin/utilities'

export interface DeleteLayersHandler extends EventHandler {
  name: 'DELETE_LAYERS'
  handler: (keyword: string) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}
