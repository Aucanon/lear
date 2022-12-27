import React, {Component} from 'react'

class Header extends Component {
  render() {
    const {name,age} = this.props
    // return (
    //   <div>
    //     <p>{this.props.name}</p>
    //     <p>{this.props.age}</p>
    //   </div>
    // )
    return (
      <div>
      <p>{name}</p>
      <p>{age}</p>
      {this.props.children}
    </div>
    )
  }
}

export default Header