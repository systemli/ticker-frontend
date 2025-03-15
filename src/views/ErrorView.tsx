import { FC } from 'react'
import Credits from '../components/Credits'

interface Props {
  message: string
}

const ErrorView: FC<Props> = ({ message }) => {
  const handleClick = () => {
    window.location.reload()
  }

  return (
    <section className="flex h-screen">
      <div className="mx-auto mt-[50%] w-full sm:m-auto sm:w-xl md:w-2xl">
        <div className="p-4 pt-8 text-center sm:p-8">
          <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-tight md:text-5xl lg:text-6xl">Oh no!</h1>
          <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">An error occurred :-(</h2>
          <p className="text-lg leading-7">{message}</p>
          <button className="mt-8 inline-flex items-center rounded-md px-2 py-1 text-sm ring" onClick={handleClick} name="reload" aria-label="Reload">
            <div className="pr-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div>Try a Reload</div>
          </button>
        </div>
        <Credits />
      </div>
    </section>
  )
}

export default ErrorView
