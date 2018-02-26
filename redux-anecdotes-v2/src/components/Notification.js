import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const message = this.props.message //aikaisemmin siis this.props.store.getState().message
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if(message === '') {
      return <div>
      </div>
    }
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
