import { once, showUI } from '@create-figma-plugin/utilities'

import { CloseHandler, DeleteLayersHandler } from './types'

// Helper function to check if a character is an alphabet letter
function isLetter(char: string): boolean {
  return char.toLowerCase() !== char.toUpperCase()
}

export default function () {
  once<DeleteLayersHandler>('DELETE_LAYERS', function (keyword: string) {
    if (keyword.trim() === '') {
      figma.notify('Keyword is empty.')
      figma.closePlugin()
      return
    }

    const layersToDelete = figma.currentPage.findAll(node => {
      const nodeName = node.name
      const keywordLower = keyword.toLowerCase()
      const nodeNameLower = nodeName.toLowerCase()
      let index = nodeNameLower.indexOf(keywordLower)

      while (index !== -1) {
        const prevChar = index > 0 ? nodeName[index - 1] : ''
        const nextChar = index + keyword.length < nodeName.length ? nodeName[index + keyword.length] : ''

        if (!isLetter(prevChar) && !isLetter(nextChar)) {
          return true // Found a valid match
        }

        // Look for the next occurrence
        index = nodeNameLower.indexOf(keywordLower, index + 1)
      }

      return false
    })

    layersToDelete.forEach(layer => layer.remove())
    figma.notify(`${layersToDelete.length} layers deleted.`)
    figma.closePlugin()
  })

  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  showUI({
    height: 137,
    width: 240
  })
}
