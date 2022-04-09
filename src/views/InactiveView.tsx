import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, Container, Grid, Header, Icon, List } from 'semantic-ui-react'
import styled from 'styled-components'
import { Credits, DescriptionItem, UpdateMessage } from '../components'
import { DescriptionTypes, InactiveSettings } from '../lib/types'

const Wrapper = styled(Container)`
  padding-top: 50px;
`

interface Props {
  settings: InactiveSettings
}

const InactiveView: FC<Props> = props => {
  const renderHeader = () => (
    <Header icon size="huge" textAlign="center">
      <Icon name="hide" />
      <Header.Content>
        {props.settings.headline}
        <Header.Subheader>{props.settings.sub_headline}</Header.Subheader>
      </Header.Content>
    </Header>
  )

  return (
    <Wrapper>
      <UpdateMessage />
      <Grid centered>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          {props.settings.headline &&
            props.settings.sub_headline &&
            renderHeader()}
          <Card fluid>
            <Card.Content>
              {props.settings.description && (
                <ReactMarkdown>{props.settings.description}</ReactMarkdown>
              )}
            </Card.Content>
            <Card.Content>
              <List>
                {props.settings.author && (
                  <DescriptionItem
                    info={props.settings.author}
                    type={DescriptionTypes.Author}
                  />
                )}
                {props.settings.email && (
                  <DescriptionItem
                    info={props.settings.email}
                    type={DescriptionTypes.Email}
                  />
                )}
                {props.settings.homepage && (
                  <DescriptionItem
                    info={props.settings.homepage}
                    type={DescriptionTypes.Homepage}
                  />
                )}
                {props.settings.twitter && (
                  <DescriptionItem
                    info={props.settings.twitter}
                    type={DescriptionTypes.Twitter}
                  />
                )}
              </List>
            </Card.Content>
          </Card>
          <Credits />
        </Grid.Column>
      </Grid>
    </Wrapper>
  )
}

export default InactiveView
