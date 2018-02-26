import React from 'react'
import {filterCreation} from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
      this.props.filterCreation(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
  }
  
  const ConnectedFilter = connect(mapStateToProps, {filterCreation})(Filter)
  
  export default ConnectedFilter