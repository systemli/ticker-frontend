import { FC } from 'react'
import Credits from '../components/Credits'
import Divider from '../components/Divider'
import Pause from '../components/icons/Pause'
import { InactiveSettings } from '../lib/types'

interface Props {
  settings: InactiveSettings
}

const InactiveView: FC<Props> = ({ settings }) => {
  return (
    <section className="flex h-screen">
      <div className="mx-auto mt-0 w-full sm:m-auto sm:w-xl md:w-2xl">
        <div className="p-4 pt-8 text-center sm:p-8">
          <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-tight md:text-5xl lg:text-6xl">{settings.headline}</h1>
          <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">{settings.subHeadline}</h2>
          <div className="px-20 sm:px-36">
            <Divider>
              <Pause className="size-6" />
            </Divider>
          </div>
          <p className="leading-7">{settings.description}</p>
          <div className="mt-2 px-2 py-2 leading-7">
            <p className="font-bold">{settings.author}</p>
            <p className="">
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
            <p className="">
              <a href={settings.homepage} target="_blank">
                {settings.homepage.replace(/https?:\/\//, '')}
              </a>
            </p>
          </div>
        </div>
        <Credits />
      </div>
    </section>
  )
}

export default InactiveView
