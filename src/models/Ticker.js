export default class Ticker {
  constructor (props) {
    this.active = props.active !== undefined ? props.active : undefined
    this.creationDate = props.creation_date !== undefined ? props.creation_date : undefined
    this.description = props.description !== undefined ? props.description : undefined
    this.domain = props.domain !== undefined ? props.domain : undefined
    this.id = props.id !== undefined ? props.id : undefined
    this.title = props.title !== undefined ? props.title : undefined
    this.information = new TickerInformation(props.information)
  }
}

class TickerInformation {
  constructor (props) {
    this.author = props.author !== undefined ? props.author : undefined
    this.email = props.email !== undefined ? props.email : undefined
    this.facebook = props.facebook !== undefined ? props.facebook : undefined
    this.twitter = props.twitter !== undefined ? props.twitter : undefined
    this.url = props.url !== undefined ? props.url : undefined
  }
}
