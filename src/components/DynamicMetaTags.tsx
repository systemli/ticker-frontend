import { FC } from 'react'
import { Helmet } from 'react-helmet'
import useTicker from './useTicker'

const DynamicMetaTags: FC = () => {
  const { ticker } = useTicker()

  if (!ticker) {
    return null
  }

  document.title = ticker.title

  return (
    <Helmet>
      <title>{ticker.title}</title>
      <meta content={ticker.information.author} name="author" />
      <meta content={ticker.description} name="description" />
      <meta content={ticker.title} property="og:title" />
      <meta content="website" property="og:type" />
      <meta content={window.location.href} property="og:url" />
      <meta content={ticker.description} property="og:description" />
    </Helmet>
  )
}

export default DynamicMetaTags
