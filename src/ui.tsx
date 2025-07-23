import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  Textbox,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { CloseHandler, DeleteLayersHandler } from './types'

function Plugin() {
  const [keyword, setKeyword] = useState<string>('star')
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteLayersButtonClick = useCallback(
    function () {
      setIsDeleting(true)
      emit<DeleteLayersHandler>('DELETE_LAYERS', keyword)
    },
    [keyword]
  )
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Keyword</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Textbox
        onValueInput={setKeyword}
        value={keyword}
        disabled={isDeleting}
      />
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleDeleteLayersButtonClick} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary disabled={isDeleting}>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
