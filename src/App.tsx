import { FC } from 'react'
import Ticker from './Ticker'
import { TickerProvider } from './components/TickerContext'

const App: FC = () => {
  return (
    <TickerProvider>
      <Ticker />
    </TickerProvider>
  )
}

export default App
