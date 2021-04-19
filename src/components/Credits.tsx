import { FC } from 'react'
import { Icon } from 'semantic-ui-react'

const Credits: FC = () => {
    return (
        <div style={{ color: 'rgba(0, 0, 0, .5)', textAlign: 'right' }}>
            <Icon name="code" /> with <Icon color="red" name="heart" /> by{' '}
            <a
                href="https://www.systemli.org"
                rel="noopener noreferrer"
                target="_blank"
            >
                systemli.org
            </a>
        </div>
    )
}

export default Credits
