import { FC } from 'react'
import { Card, CardContent, Grid, Icon, Popup } from 'semantic-ui-react'
import { Message as MessageType } from '../lib/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Attachments from './Attachments'
import styled from 'styled-components'
import Map from './Map'
import linkifyHtml from 'linkify-html'
import parse from 'html-react-parser'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const AttachmentsWrapper = styled(Card.Content)`
  padding: 0;
`

interface Props {
  message: MessageType
}

const Message: FC<Props> = props => {
  const relativeCreationDate = (
    <div>
      <Icon name="clock" />
      {dayjs(props.message.createdAt).fromNow()}
    </div>
  )
  const creationDate = dayjs(props.message.createdAt).format('LLLL')

  const decorateText = (text: string) => {
    // replace newlines
    text = text.replace(/\r\n|\r|\n/g, '<br />')
    // turn URLs into links
    return linkifyHtml(text, { defaultProtocol: 'https' })
  }

  return (
    <Card fluid>
      <CardContent>
        <div>{parse(decorateText(props.message.text))}</div>
      </CardContent>
      {props.message.attachments && (
        <AttachmentsWrapper>
          <Attachments attachments={props.message.attachments} />
        </AttachmentsWrapper>
      )}
      <Map featureCollection={props.message.geoInformation} />
      <Card.Content extra>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Popup content={creationDate} flowing inverted size="tiny" trigger={relativeCreationDate} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default Message
