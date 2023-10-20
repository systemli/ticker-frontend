import { FC } from 'react'
import { Helmet } from 'react-helmet'
import useTicker from './useTicker'

const DynamicMetaTags: FC = () => {
  const { ticker } = useTicker()

  if (!ticker) {
    return null
  }

  return (
    <Helmet>
      <meta content={ticker.description} name="description" />
      <meta content="summary" name="twitter:card" />
      <meta content={ticker.title} name="twitter:title" />
      <meta content={ticker.description} name="twitter:description" />
      <meta content={ticker.information.twitter ? `@${ticker.information.twitter}` : ''} name="twitter:site" />
      <meta content={ticker.title} property="og:title" />
      <meta content="website" property="og:type" />
      <meta content={window.location.href} property="og:url" />
      <meta content={ticker.description} property="og:description" />
    </Helmet>
  )
}

export default DynamicMetaTags
