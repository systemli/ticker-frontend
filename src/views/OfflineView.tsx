import { FC } from 'react'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import { Credits } from '../components'

const OfflineView: FC = () => {
    return (
        <Container style={{ paddingTop: '1em' }}>
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
        </Container>
    )
}

export default OfflineView
