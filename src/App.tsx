import { FC } from 'react'
import Ticker from './Ticker'
import DynamicMetaTags from './components/DynamicMetaTags'
import { TickerProvider } from './components/TickerContext'

const App: FC = () => {
  return (
    <TickerProvider>
      <DynamicMetaTags />
      <Ticker />
    </TickerProvider>
  )
}

export default App
