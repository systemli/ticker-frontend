import { FC, useEffect, useRef } from 'react'

interface Props {
  title: string
}

const Title: FC<Props> = ({ title }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (h1Ref.current) {
        h1Ref.current.classList.toggle('text-3xl', window.scrollY > 100)
        h1Ref.current.classList.toggle('text-5xl', window.scrollY <= 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="mx-3 border-s border-gray-200 dark:border-gray-600">
      <h1 ref={h1Ref} className="px-4 py-4 text-5xl font-extrabold tracking-tight delay-200 duration-400 lg:text-6xl">
        {title}
      </h1>
    </div>
  )
}

export default Title
