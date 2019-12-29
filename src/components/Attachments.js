import React from 'react'
import PropTypes from 'prop-types'
import { ButtonBack, ButtonNext, CarouselProvider, Dot, Image, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Button } from 'semantic-ui-react'

export default class Attachments extends React.Component {
  constructor (props) {
    super(props)
  }

  buttons () {
    const attachments = this.props.attachments

    if (attachments.length === 1) {
      return null
    }

    const style = {position: 'absolute', bottom: '50%', transform: 'translateY(50%)'}

    return (
      <div style={{}}>
        <Button floated='left' as={ButtonBack} color='grey' icon='arrow circle left' size='large'
                style={{...style, ...{left: 5}}}/>
        <Button floated='right' as={ButtonNext} color='grey' icon='arrow circle right' size='large'
                style={{...style, ...{right: 5}}}/>
      </div>
    )
  }

  dots () {
    const attachments = this.props.attachments

    if (attachments.length === 1) {
      return null
    }

    return (
      <div style={{position: 'absolute', bottom: 5, width: '100%', display: 'block', textAlign: 'center'}}>
        <Button.Group size='mini'>
          {[...Array(attachments.length).keys()].map(slide => (
            <Button as={Dot} key={slide} icon='circle' slide={slide}/>
          ))}
        </Button.Group>
      </div>
    )
  }

  render () {
    const attachments = this.props.attachments

    if (attachments === null) {
      return null
    }

    const slides = attachments.map((image, key) =>
      <Slide key={key} index={key}>
        <Image src={image.url} style={{objectFit: 'scale-down'}}/>
      </Slide>)

    return (
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={0.75}
        totalSlides={attachments.length}
        style={{position: 'relative'}}>
        <Slider>
          {slides}
        </Slider>
        {this.dots()}
        {this.buttons()}
      </CarouselProvider>
    )
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
}
