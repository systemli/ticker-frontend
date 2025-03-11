import { FC } from 'react'

const EmptyMessageList: FC = () => {
  return (
    <article className="relative p-2">
      <div className="ms-4 mb-10">
        <div className="mb-4 text-6xl font-extrabold">:-(</div>
        <div>
          <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-950 dark:bg-gray-600"></div>
          <div>We don't have any messages at the moment.</div>
        </div>
      </div>
    </article>
  )
}

export default EmptyMessageList
