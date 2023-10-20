import { breakpoints } from './theme'

// FIXME: Not sure if checking the width once and using it to decide upon
// what markup to render actually is the best solution here.
export const isMobile = (): boolean => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
  return width < breakpoints.mobile
}
