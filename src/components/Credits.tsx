import { FC } from 'react'
import Code from './icons/Code'
import Heart from './icons/Heart'

const Credits: FC = () => {
  return (
    <footer>
      <div className="flex flex-col items-center justify-center pb-4">
        <div className="flex flex-row text-xs">
          <div aria-label="Code with">
            <Code className="size-4" />
          </div>
          <div className="px-1">with</div>
          <div aria-label="Love">
            <Heart className="size-4" />
          </div>
          <div className="px-1">by systemli.org</div>
        </div>
      </div>
    </footer>
  )
}

export default Credits
