import { FC } from 'react'

interface Props {
  icon: FC<{ className: string }>
  label: string
  url?: string
}

const InformationItem: FC<Props> = ({ icon: Icon, label, url }) => {
  const isEmail = label.includes('@')
  const href = isEmail ? `mailto:${label}` : url

  return (
    <div className="flex flex-shrink-0 items-center pl-4 first:pl-0 md:pl-0">
      <Icon className="size-4" />
      <p className="pl-1">
        {url ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ) : (
          label
        )}
      </p>
    </div>
  )
}

export default InformationItem
