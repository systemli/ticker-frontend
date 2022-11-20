import { FC } from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'

const MessagesPlaceholder: FC = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon color={'grey'} name="hourglass half" />
        We dont have any messages at the moment.
      </Header>
    </Segment>
  )
}

export default MessagesPlaceholder
