import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Card, Icon, List, Modal } from 'semantic-ui-react'
import Credits from './Credits'
import DescriptionItem from './DescriptionItem'
import { DescriptionTypes, Ticker } from '../lib/types'
import { getAtomFeedUrl, getRssFeedUrl } from '../lib/api'

interface Props {
  ticker: Ticker
  isModal?: boolean
}

const About: FC<Props> = props => {
  const renderDescriptionList = () => (
    <List>
      {props.ticker.information.author && (
        <DescriptionItem
          info={props.ticker.information.author}
          type={DescriptionTypes.Author}
        />
      )}
      {props.ticker.information.email && (
        <DescriptionItem
          info={props.ticker.information.email}
          type={DescriptionTypes.Email}
        />
      )}
      {props.ticker.information.url && (
        <DescriptionItem
          info={props.ticker.information.url}
          type={DescriptionTypes.Homepage}
        />
      )}
      {props.ticker.information.twitter && (
        <DescriptionItem
          info={props.ticker.information.twitter}
          type={DescriptionTypes.Twitter}
        />
      )}
      {props.ticker.information.facebook && (
        <DescriptionItem
          info={props.ticker.information.facebook}
          type={DescriptionTypes.Facebook}
        />
      )}
      {props.ticker.information.telegram && (
        <DescriptionItem
          info={props.ticker.information.telegram}
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

  if (props.isModal) {
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
          <ReactMarkdown>{props.ticker.description}</ReactMarkdown>
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
          <ReactMarkdown>{props.ticker.description}</ReactMarkdown>
        </Card.Content>
        <Card.Content>{renderDescriptionList()}</Card.Content>
      </Card>
      <Credits />
    </div>
  )
}

export default About
