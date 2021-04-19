import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, Container, Grid, Header, Icon, List } from 'semantic-ui-react'
import { Credits } from '../components'
import { InactiveSettings } from '../types'

interface Props {
    settings: InactiveSettings
}

const InactiveView: FC<Props> = props => {
    return (
        <Container style={{ paddingTop: 50 }}>
            {/* <UpdateMessage update={this.props.update} /> */}
            <Grid centered>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                    {props.settings.headline && props.settings.sub_headline && (
                        <Header size="huge" textAlign="center" icon>
                            <Icon name="hide" />
                            <Header.Content>
                                {props.settings.headline}
                                <Header.Subheader>
                                    {props.settings.sub_headline}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    )}
                    <Card fluid>
                        <Card.Content>
                            {props.settings.description && (
                                <ReactMarkdown>
                                    {props.settings.description}
                                </ReactMarkdown>
                            )}
                        </Card.Content>
                        <Card.Content>
                            <Header size="small">Information</Header>
                            <List>
                                {props.settings.author && (
                                    <List.Item>
                                        <List.Icon name="users" />
                                        <List.Content>
                                            {props.settings.author}
                                        </List.Content>
                                    </List.Item>
                                )}
                                {props.settings.email && (
                                    <List.Item>
                                        <List.Icon name="mail" />
                                        <List.Content>
                                            <a
                                                href={`mailto:
                                                    ${props.settings.email}`}
                                            >
                                                Email
                                            </a>
                                        </List.Content>
                                    </List.Item>
                                )}
                                {props.settings.homepage && (
                                    <List.Item>
                                        <List.Icon name="linkify" />
                                        <List.Content>
                                            <a href={props.settings.homepage}>
                                                Homepage
                                            </a>
                                        </List.Content>
                                    </List.Item>
                                )}
                                {props.settings.twitter && (
                                    <List.Item>
                                        <List.Icon name="twitter" />
                                        <List.Content>
                                            <a
                                                href={`https://twitter.com/${props.settings.twitter}`}
                                            >
                                                @{props.settings.twitter}
                                            </a>
                                        </List.Content>
                                    </List.Item>
                                )}
                            </List>
                        </Card.Content>
                    </Card>
                    <Credits />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default InactiveView
