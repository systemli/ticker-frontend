import { FC } from 'react'
import { Container, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import { spacing } from '../lib/theme'
import useTicker from '../components/useTicker'
import EmbedMessageList from '../components/EmbedMessageList'

const Wrapper = styled(Container)`
  padding: ${spacing.normal} 0;
`

const HeaderWrapper = styled(Header)`
  margin: 0 0 ${spacing.normal} !important;
`

const EmbedActiveView: FC = () => {
  const { ticker } = useTicker()

  const headline =
    ticker === null || ticker.title == undefined ? (
      'Ticker'
    ) : (
      <a href={ticker?.domain} rel="noopener noreferrer" target="_blank">
        {ticker.title}
      </a>
    )

  return (
    <Wrapper>
      {headline && <HeaderWrapper content={headline} size={'large'} />}
      <EmbedMessageList />
    </Wrapper>
  )
}

export default EmbedActiveView
