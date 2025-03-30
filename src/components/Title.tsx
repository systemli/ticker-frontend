import { FC, useEffect, useRef, useState } from 'react'

interface Props {
  title: string
}

const Title: FC<Props> = ({ title }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const wrapperHeight = () => {
    if (wrapperRef.current) {
      const height = wrapperRef.current.offsetHeight
      return `${height * 0.75}px`
    }
    return 'auto'
  }

  useEffect(() => {
    const handleScroll = () => {
      if (h1Ref.current && wrapperRef.current) {
        const scrolled = window.scrollY > 100
        setIsScrolled(scrolled)

        // Only toggle classes - responsive behavior will be handled by Tailwind
        h1Ref.current.classList.toggle('max-sm:scale-66', scrolled)
        h1Ref.current.classList.toggle('max-sm:-translate-x-15', scrolled)
        h1Ref.current.classList.toggle('max-sm:-translate-y-5', scrolled)
        h1Ref.current.classList.toggle('max-sm:scale-none', !scrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="mx-3 border-s border-gray-200 transition-all delay-200 duration-400 max-sm:h-auto dark:border-gray-600"
      style={{
        // Only apply height change on small screens
        height: isScrolled && window.innerWidth <= 640 ? wrapperHeight() : 'auto',
      }}
    >
      <h1 ref={h1Ref} className="px-4 py-4 text-left text-5xl font-extrabold tracking-tight duration-200 lg:text-6xl">
        {title}
      </h1>
    </div>
  )
}

export default Title
