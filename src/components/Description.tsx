import { FC } from 'react'
import { Ticker } from '../lib/types'
import At from './icons/At'
import Author from './icons/Author'
import Bluesky from './icons/Bluesky'
import Facebook from './icons/Facebook'
import Instagram from './icons/Instagram'
import Mastodon from './icons/Mastodon'
import Telegram from './icons/Telegram'
import Threads from './icons/Threads'
import Twitter from './icons/Twitter'
import Url from './icons/Url'
import InformationItem from './InformationItem'

interface Props {
  ticker: Ticker
}

const Description: FC<Props> = ({ ticker }) => {
  return (
    <div className="p-4">
      {ticker.description && (
        <div className="tracking-tight md:text-lg">
          {ticker.description.split('\n').map(paragraph => (
            <p key={paragraph} className="">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <div className="text-base/8">
        <div className="mt-2 flex overflow-x-scroll md:mt-4 md:grid md:grid-cols-2 md:place-items-center md:overflow-x-auto lg:mx-auto">
          {ticker.information.author && <InformationItem icon={Author} label={ticker.information.author} />}
          {ticker.information.email && <InformationItem icon={At} label={ticker.information.email} url={ticker.information.email} />}
          {ticker.information.url && <InformationItem icon={Url} label={ticker.information.url.replace(/https?:\/\//, '')} url={ticker.information.url} />}
          {ticker.information.mastodon && (
            <InformationItem icon={Mastodon} label={ticker.information.mastodon.replace(/https?:\/\//, '')} url={ticker.information.mastodon} />
          )}
          {ticker.information.bluesky && (
            <InformationItem
              icon={Bluesky}
              label={ticker.information.bluesky.replace(/https?:\/\/bsky\.app\/profile\//, '')}
              url={ticker.information.bluesky}
            />
          )}
          {ticker.information.telegram && (
            <InformationItem icon={Telegram} label={ticker.information.telegram} url={`https://t.me/${ticker.information.telegram}`} />
          )}
          {ticker.information.facebook && (
            <InformationItem icon={Facebook} label={ticker.information.facebook} url={`https://fb.com/${ticker.information.facebook}`} />
          )}
          {ticker.information.threads && (
            <InformationItem icon={Threads} label={ticker.information.threads} url={`https://www.threads.net/${ticker.information.threads}`} />
          )}
          {ticker.information.instagram && (
            <InformationItem icon={Instagram} label={ticker.information.instagram} url={`https://instagram.com/${ticker.information.instagram}`} />
          )}
          {ticker.information.twitter && (
            <InformationItem icon={Twitter} label={`@${ticker.information.twitter}`} url={`https://x.com/${ticker.information.twitter}`} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Description
