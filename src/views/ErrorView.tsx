import { FC, useCallback } from 'react'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { Credits } from '../components'
import { spacing } from '../lib/theme'

const Wrapper = styled(Container)`
  padding-top: ${spacing.normal};
`

interface Props {
  message: string
}

const ErrorView: FC<Props> = props => {
  const handleClick = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <Wrapper>
      <Segment placeholder>
        <Header icon>
          <Icon name="ban" />
          {props.message}
        </Header>
        <Button onClick={handleClick} primary>
          Try reload
        </Button>
      </Segment>
      <Credits />
    </Wrapper>
  )
}

export default ErrorView
