import { useContext } from 'react'
import TickerContext from './TickerContext'

export default function useTicker() {
  return useContext(TickerContext)
}
