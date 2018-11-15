export default class InactiveSettings {
  constructor (props) {
    this.author = props.author !== undefined ? props.author : undefined
    this.email = props.email !== undefined ? props.email : undefined
    this.homepage = props.homepage !== undefined ? props.homepage : undefined
    this.twitter = props.twitter !== undefined ? props.twitter : undefined
    this.headline = props.headline !== undefined ? props.headline : undefined
    this.subHeadline = props.sub_headline !== undefined ? props.sub_headline : undefined
    this.description = props.description !== undefined ? props.description : undefined
  }
}
