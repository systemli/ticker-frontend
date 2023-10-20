import { FC, useCallback, useState } from 'react'
import { Container, Grid, Header, Sticky } from 'semantic-ui-react'
import styled from 'styled-components'
import { spacing } from '../lib/theme'
import { isMobile } from '../lib/helper'
import About from '../components/About'
import ReloadInfo from '../components/ReloadInfo'
import MessageList from '../components/MessageList'
import DynamicMetaTags from '../components/DynamicMetaTags'
import useTicker from '../components/useTicker'

const Wrapper = styled(Container)`
  padding: ${spacing.normal} 0;
`

const HeaderWrapper = styled(Header)`
  margin: 0 0 ${spacing.normal} !important;
`

type StickyContext = Document | Window | HTMLElement | React.Ref<HTMLElement>

const ActiveView: FC = () => {
  const [stickyContext, setStickyContext] = useState<StickyContext>()
  const { ticker } = useTicker()

  const headline = ticker === null || ticker.title == undefined ? 'Ticker' : ticker.title

  const handleContextRef = useCallback((stickyContextValue: StickyContext) => {
    setStickyContext(stickyContextValue)
  }, [])

  if (isMobile()) {
    return (
      <Wrapper>
        <DynamicMetaTags />
        <About isModal />
        {headline && <HeaderWrapper content={headline} size={'large'} />}
        <ReloadInfo />
        <MessageList />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <DynamicMetaTags />
      {headline && <HeaderWrapper content={headline} size={'large'} />}
      <ReloadInfo />
      <Grid divided={'vertically'}>
        <Grid.Row columns={2}>
          <Grid.Column computer={10} tablet={10}>
            <div ref={handleContextRef}>
              <MessageList />
            </div>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6}>
            <Sticky context={stickyContext} offset={30}>
              <About />
            </Sticky>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  )
}

export default ActiveView
