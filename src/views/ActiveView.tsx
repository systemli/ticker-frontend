import { FC, useState } from 'react'
import { Container, Grid, Header, Sticky } from 'semantic-ui-react'
import styled from 'styled-components'
import { About, MessageList, ReloadInfo } from '../components'
import { spacing } from '../lib/theme'
import { Ticker } from '../types'

const Wrapper = styled(Container)`
    padding: ${spacing.normal} 0;
`

const HeaderWrapper = styled(Header)`
    margin: 0 0 ${spacing.normal};
`

interface Props {
    ticker: Ticker
    update: boolean
    refreshInterval: number
}

const ActiveView: FC<Props> = props => {
    const [stickyContext, setStickyContext] = useState()

    const headline =
        props.ticker === null || props.ticker.title == undefined
            ? 'Ticker'
            : props.ticker.title

    // FIXME
    const handleContextRef = (stickyContextValue: any) => {
        setStickyContext(stickyContextValue)
    }

    return (
        <Wrapper>
            {/* <UpdateMessage update={props.update} /> */}
            {headline && <HeaderWrapper content={headline} size={'large'} />}
            <ReloadInfo />
            <Grid divided={'vertically'}>
                <Grid.Row columns={2}>
                    <Grid.Column computer={10} tablet={10}>
                        <div ref={handleContextRef}>
                            <MessageList
                                refreshInterval={props.refreshInterval}
                                ticker={props.ticker}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6}>
                        <Sticky context={stickyContext} offset={30}>
                            <About ticker={props.ticker} isModal />
                        </Sticky>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Wrapper>
    )
}

export default ActiveView
