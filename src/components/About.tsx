import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Card, Icon, List, Modal } from 'semantic-ui-react'
import Credits from './Credits'
import DescriptionItem from './DescriptionItem'
import { DescriptionTypes } from '../lib/types'
import { getAtomFeedUrl, getRssFeedUrl } from '../lib/api'
import useTicker from './useTicker'

interface Props {
  isModal?: boolean
}

const About: FC<Props> = ({ isModal }) => {
  const { ticker } = useTicker()

  if (!ticker) {
    return null
  }

  const renderDescriptionList = () => (
    <List>
      {ticker.information.author && (
        <DescriptionItem
          info={ticker.information.author}
          type={DescriptionTypes.Author}
        />
      )}
      {ticker.information.email && (
        <DescriptionItem
          info={ticker.information.email}
          type={DescriptionTypes.Email}
        />
      )}
      {ticker.information.url && (
        <DescriptionItem
          info={ticker.information.url}
          type={DescriptionTypes.Homepage}
        />
      )}
      {ticker.information.twitter && (
        <DescriptionItem
          info={ticker.information.twitter}
          type={DescriptionTypes.Twitter}
        />
      )}
      {ticker.information.facebook && (
        <DescriptionItem
          info={ticker.information.facebook}
          type={DescriptionTypes.Facebook}
        />
      )}
      {ticker.information.telegram && (
        <DescriptionItem
          info={ticker.information.telegram}
          type={DescriptionTypes.Telegram}
        />
      )}
      <List.Item>
        <List.Icon name="feed" />
        <List.Content>
          <a href={getAtomFeedUrl()}>Atom</a> |{' '}
          <a href={getRssFeedUrl()}>RSS</a>
        </List.Content>
      </List.Item>
    </List>
  )

  if (isModal) {
    return (
      <Modal
        closeIcon
        dimmer={'blurring'}
        trigger={
          <Button circular color={'blue'} floated={'right'} icon>
            <Icon name={'info'} />
          </Button>
        }
      >
        <Modal.Header>About</Modal.Header>
        <Modal.Content>
          <ReactMarkdown>{ticker.description || ''}</ReactMarkdown>
        </Modal.Content>
        <Modal.Content>
          {renderDescriptionList()}
          <Credits />
        </Modal.Content>
      </Modal>
    )
  }

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header>About</Card.Header>
        </Card.Content>
        <Card.Content>
          <ReactMarkdown>{ticker.description || ''}</ReactMarkdown>
        </Card.Content>
        <Card.Content>{renderDescriptionList()}</Card.Content>
      </Card>
      <Credits />
    </div>
  )
}

export default About
