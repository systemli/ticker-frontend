import { FC } from 'react'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { Credits } from '../components'
import { spacing } from '../lib/theme'

const Wrapper = styled(Container)`
    padding-top: ${spacing.normal};
`

const handleClick = () => {
    window.location.reload()
}

const ErrorView: FC = () => {
    return (
        <Wrapper>
            <Segment placeholder>
                <Header icon>
                    <Icon name="ban" />
                    TODO: error
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
