import { FC } from 'react'
import { List } from 'semantic-ui-react'
import { DescriptionTypes } from '../lib/types'

interface Props {
    info: string
    type: DescriptionTypes
}

const DescriptionItem: FC<Props> = props => {
    switch (props.type) {
        case DescriptionTypes.Author:
            return (
                <List.Item>
                    <List.Icon name="users" />
                    <List.Content>{props.info}</List.Content>
                </List.Item>
            )
        case DescriptionTypes.Email:
            return (
                <List.Item>
                    <List.Icon name="mail" />
                    <List.Content>
                        <a
                            href={`mailto:
                                    ${props.info}`}
                        >
                            {props.info}
                        </a>
                    </List.Content>
                </List.Item>
            )
        case DescriptionTypes.Facebook:
            return (
                <List.Item>
                    <List.Icon name="facebook" />
                    <List.Content>
                        <a
                            href={`https://fb.com/${props.info}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            fb.com/{props.info}
                        </a>
                    </List.Content>
                </List.Item>
            )
        case DescriptionTypes.Homepage:
            return (
                <List.Item>
                    <List.Icon name="linkify" />
                    <List.Content>
                        <a href={props.info}>{props.info}</a>
                    </List.Content>
                </List.Item>
            )
        case DescriptionTypes.Twitter:
            return (
                <List.Item>
                    <List.Icon name="twitter" />
                    <List.Content>
                        <a href={`https://twitter.com/${props.info}`}>
                            @{props.info}
                        </a>
                    </List.Content>
                </List.Item>
            )
        default:
            return null
    }
}

export default DescriptionItem
