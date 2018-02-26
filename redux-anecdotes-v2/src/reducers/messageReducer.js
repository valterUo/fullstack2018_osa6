const initialState = ''

export const messageCreation = (content) => {
    return {
      type: 'NEW_MESSAGE',
      content
    }
  }

  export const emptyMessage = () => {
    return {
      type: 'EMPTY'
    }
  }

  export const notify = (message, time) => {
      console.log(message)
    return async (dispatch) => {
        await dispatch({
            type: 'NEW_MESSAGE',
            content: message
          })
        setTimeout(() => {
            console.log(message)
            dispatch({ 
                type: 'EMPTY'
              })
      }, time)
    }
  }

  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEW_MESSAGE':
        return action.content
      case 'EMPTY':
        return initialState
      default:
        return state
    }
  }

  export default messageReducer