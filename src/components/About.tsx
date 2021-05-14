import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Card, Icon, List, Modal } from 'semantic-ui-react'
import Credits from './Credits'
import DescriptionItem from './DescriptionItem'
import { DescriptionTypes, Ticker } from '../lib/types'

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
        </List>
    )

    if (props.isModal) {
        return (
            <Modal
                dimmer={'blurring'}
                trigger={
                    <Button color={'blue'} floated={'right'} circular icon>
                        <Icon name={'info'} />
                    </Button>
                }
                closeIcon
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
