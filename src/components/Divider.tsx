import { FC } from 'react'

interface Props {
  children: React.ReactNode
}

const Divider: FC<Props> = ({ children }) => {
  return (
    <div className="inline-flex w-full items-center justify-center">
      <hr className="mx-auto h-[1px] w-full rounded-sm border-0 bg-gray-900 dark:bg-gray-400"></hr>
      <div className="px-4">{children}</div>
      <hr className="mx-auto h-[1px] w-full rounded-sm border-0 bg-gray-900 dark:bg-gray-400"></hr>
    </div>
  )
}

export default Divider
