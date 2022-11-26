import { FC } from 'react'
import { TickerProvider } from './components/useTicker'
import Ticker from './Ticker'

const App: FC = () => {
  return (
    <TickerProvider>
      <Ticker />
    </TickerProvider>
  )
}

export default App
