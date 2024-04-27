import { FC, useState } from 'react'
import { ButtonBack, ButtonNext, CarouselProvider, Dot, Image, Slide, Slider } from 'pure-react-carousel'
import styled from 'styled-components'
import { Attachment } from '../lib/types'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Button, Modal, ModalContent } from 'semantic-ui-react'

const Wrapper = styled(CarouselProvider)`
  position: relative;
`

const DotWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  display: block;
  text-align: center;
`

interface Props {
  attachments: Attachment[]
}

const Attachments: FC<Props> = props => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalImageSrc, setModalImageSrc] = useState<string>('')

  const renderButtonsAndDots = () => {
    // FIXME: This doesn't feel like a good pattern.
    // Tried to use styled components instead which didn't work right away.
    const style = {
      position: 'absolute',
      bottom: '50%',
      transform: 'translateY(50%)',
    }

    return (
      <>
        <DotWrapper>
          <Button.Group size="mini">
            {[...Array(props.attachments.length).keys()].map(slide => (
              <Button key={slide} as={Dot} icon="circle" slide={slide} />
            ))}
          </Button.Group>
        </DotWrapper>
        <Button as={ButtonBack} color="grey" floated="left" icon="arrow circle left" size="large" style={{ ...style, ...{ left: 5 } }} />
        <Button as={ButtonNext} color="grey" floated="right" icon="arrow circle right" size="large" style={{ ...style, ...{ right: 5 } }} />
      </>
    )
  }

  const handleImageClick = (event: React.MouseEvent) => {
    if (!event.target?.src) {
      return
    }
    setModalImageSrc(event.target.src)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setModalImageSrc('')
  }

  return (
    <Wrapper naturalSlideHeight={0.75} naturalSlideWidth={1} totalSlides={props.attachments.length}>
      <Slider>
        {props.attachments.map((image, key) => (
          <Slide key={key} index={key}>
            <Image hasMasterSpinner={false} src={image.url} onClick={handleImageClick} style={{ objectFit: 'scale-down' }} />
          </Slide>
        ))}
      </Slider>
      {props.attachments.length > 1 && renderButtonsAndDots()}
      <Modal closeIcon onClose={handleModalClose} open={modalOpen}>
        <ModalContent>
          <Image hasMasterSpinner={false} src={modalImageSrc} style={{ objectFit: 'scale-down' }} />
        </ModalContent>
      </Modal>
    </Wrapper>
  )
}

export default Attachments
