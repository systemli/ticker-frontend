import { FC } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const MessagesLoader: FC = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted size="small">
        Loading messages
      </Loader>
    </Dimmer>
  )
}

export default MessagesLoader
