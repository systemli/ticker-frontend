import { FC, useState } from 'react'
import { Attachment } from '../lib/types'
import Lightbox from './Lightbox'

interface Props {
  attachments?: Attachment[]
}

const Attachments: FC<Props> = ({ attachments }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [currentImage, setCurrentImage] = useState<number>(0)

  const handleClick = (index: number) => {
    setCurrentImage(index)
    setOpen(true)
  }

  if (attachments?.length === 0) {
    return null
  }

  const images = attachments?.map(attachment => attachment.url) ?? []

  return (
    <div>
      <div className={`mt-2 grid max-h-full grid-flow-col gap-1 md:max-h-3/6 md:gap-2`}>
        {attachments?.map((attachment, key) => (
          <button key={attachment.url} onClick={() => handleClick(key)}>
            <img src={attachment.url} className="rounded" alt="" />
          </button>
        ))}
      </div>
      {open && <Lightbox images={images} initialImage={currentImage} onClose={() => setOpen(false)} />}
    </div>
  )
}

export default Attachments
