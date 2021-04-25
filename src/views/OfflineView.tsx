import { FC } from 'react'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { Credits } from '../components'
import { spacing } from '../lib/theme'

const Wrapper = styled(Container)`
    padding-top: ${spacing.normal};
`

const OfflineView: FC = () => {
    return (
        <Wrapper>
            <Segment placeholder>
                <Header icon>
                    <Icon name="ban" />
                    Seems you are offline
                </Header>
                <Button onClick={() => window.location.reload()} primary>
                    Try reload
                </Button>
            </Segment>
            <Credits />
        </Wrapper>
    )
}

export default OfflineView
