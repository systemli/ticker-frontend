import { FC } from 'react'
import { TickerProvider } from './components/useTicker'
import ViewRenderer from './ViewRenderer'

const App: FC = () => {
  return (
    <TickerProvider>
      <ViewRenderer />
    </TickerProvider>
  )
}

export default App
