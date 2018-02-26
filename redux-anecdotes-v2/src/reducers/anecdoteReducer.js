import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ 
      type: 'CREATE',
      content: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateVote(anecdote)
    dispatch({ type: 'VOTE', id: anecdote.id })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch( {
    type: 'INIT',
    content: anecdotes
  })
}
}

//const initialState = anecdotesAtStart.map(asObject)
const initialState = []

const reducer = (store = initialState, action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.content]
  }
  if(action.type === 'INIT') {
    return action.content
  }

  return store
}

export default reducer