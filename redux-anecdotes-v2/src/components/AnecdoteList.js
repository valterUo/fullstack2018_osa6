import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/messageReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleClick = (anecdote) => async () => {
    this.props.vote(anecdote)
    /*this.props.messageCreation('You voted anecdote: ' + anecdote.content)
    setTimeout(() => {
      this.props.emptyMessage()
    }, 5000)*/
    this.props.notify('You voted anecdote: ' + anecdote.content, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }
  const anecdotes2 = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  return anecdotes2
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {notify, vote})(AnecdoteList)

export default ConnectedAnecdoteList
