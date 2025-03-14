import { FC } from 'react'
import { Ticker } from '../lib/types'
import Author from './icons/Author'
import Bluesky from './icons/Bluesky'
import Mastodon from './icons/Mastodon'
import Telegram from './icons/Telegram'
import Url from './icons/Url'

interface Props {
  ticker: Ticker
}

const Description: FC<Props> = ({ ticker }) => {
  return (
    <div className="p-4">
      {ticker.description && (
        <div className="tracking-tight md:text-lg">
          {ticker?.description.split('\n').map(paragraph => (
            <p key={paragraph} className="">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <div className="">
        <div className="mt-2 flex overflow-x-scroll md:mt-4 md:grid md:grid-cols-2 md:place-items-center md:overflow-x-auto lg:mx-auto">
          {ticker?.information.author && (
            <div className="flex flex-shrink-0 items-center">
              <Author className="size-4" />
              <p className="pl-1">{ticker.information.author}</p>
            </div>
          )}
          {ticker?.information.url && (
            <div className="flex flex-shrink-0 items-center pl-2 lg:pl-0">
              <Url className="size-4" />
              <p className="pl-1">
                <a href={ticker.information.url}>{ticker.information.url.replace(/https?:\/\//, '')}</a>
              </p>
            </div>
          )}
          {ticker?.information.mastodon && (
            <div className="flex flex-shrink-0 items-center pl-2 lg:pl-0">
              <Mastodon className="size-4" />
              <p className="pl-1">
                <a href={ticker.information.mastodon}>{ticker.information.mastodon.replace(/https?:\/\//, '')}</a>
              </p>
            </div>
          )}
          {ticker?.information.bluesky && (
            <div className="flex flex-shrink-0 items-center pl-2 lg:pl-0">
              <Bluesky className="size-4" />
              <p className="pl-1">
                <a href={ticker.information.bluesky}>{ticker.information.bluesky.replace(/https?:\/\//, '')}</a>
              </p>
            </div>
          )}
          {ticker?.information.telegram && (
            <div className="flex flex-shrink-0 items-center pl-2 md:pl-0">
              <Telegram className="size-4" />
              <p className="pl-1">
                <a href={ticker.information.telegram}>{ticker.information.telegram.replace(/https?:\/\//, '')}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Description
