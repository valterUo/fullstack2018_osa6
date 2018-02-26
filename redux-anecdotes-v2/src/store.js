import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    message: messageReducer,
    filter: filterReducer
  })

const store = createStore(reducer, applyMiddleware(thunk))

/*anecdoteService.getAll().then(anecdotes =>
        store.dispatch(anecdoteInitialization(anecdotes))
  )*/

export default store