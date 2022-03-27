import { FC, useCallback } from 'react'
import { Message } from 'semantic-ui-react'
import styled from 'styled-components'
import { spacing, zIndex } from '../lib/theme'

const Wrapper = styled.div`
  position: fixed;
  left: ${spacing.normal};
  bottom: ${spacing.normal};
  right: ${spacing.normal};
  text-aling: center;
  z-index: ${zIndex.updateMessage};
`

const Link = styled.a`
  cursor: pointer;
`

interface Props {
  update: boolean
}

const UpdateMessage: FC<Props> = props => {
  const handleClick = useCallback(() => {
    window.location.reload()
  }, [])

  if (!props.update) {
    return null
  }

  return (
    <Wrapper>
      <Message color={'yellow'} negative>
        An update is available. Click <Link onClick={handleClick}>here</Link> to
        update the App.
      </Message>
    </Wrapper>
  )
}

export default UpdateMessage
