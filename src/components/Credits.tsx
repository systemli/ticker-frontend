import { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
    color: rgba(0, 0, 0, 0.5);
    text-align: right;
`

const Credits: FC = () => {
    return (
        <Wrapper>
            <Icon name="code" /> with <Icon color="red" name="heart" /> by{' '}
            <a
                href="https://www.systemli.org"
                rel="noopener noreferrer"
                target="_blank"
            >
                systemli.org
            </a>
        </Wrapper>
    )
}

export default Credits
