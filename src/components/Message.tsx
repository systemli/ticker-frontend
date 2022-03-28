import { FC } from 'react'
import { Card, CardContent, Grid, Icon, Popup } from 'semantic-ui-react'
import { Message as MessageType } from '../lib/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { replaceMagic } from '../lib/helper'
import Attachments from './Attachments'
import styled from 'styled-components'
import Map from './Map'

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
      {dayjs(props.message.creation_date).fromNow()}
    </div>
  )
  const creationDate = dayjs(props.message.creation_date).format('LLLL')

  return (
    <Card fluid>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceMagic(props.message.text),
          }}
        />
      </CardContent>
      {props.message.attachments && (
        <AttachmentsWrapper>
          <Attachments attachments={props.message.attachments} />
        </AttachmentsWrapper>
      )}
      <Map featureCollection={props.message.geo_information} />
      <Card.Content extra>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Popup
                content={creationDate}
                flowing
                inverted
                size="tiny"
                trigger={relativeCreationDate}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default Message
