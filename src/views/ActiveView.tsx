import { FC } from 'react'
import { Container, Grid, Header, Sticky } from 'semantic-ui-react'
import { Ticker } from '../types'

interface Props {
    ticker: Ticker
    update: boolean
}

const ActiveView: FC<Props> = props => {
    const headline =
        props.ticker === null || props.ticker.title == undefined
            ? 'Ticker'
            : props.ticker.title

    return (
        <Container style={{ padding: '1em 0' }}>
            {headline && (
                <Header
                    content={headline}
                    size={'large'}
                    style={{ margin: '0 0 1rem' }}
                />
            )}
        </Container>
    )
}

export default ActiveView
