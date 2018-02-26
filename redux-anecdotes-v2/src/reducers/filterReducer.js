const initialState = ''

export const filterCreation = (content) => {
    return {
      type: 'NEW_FILTER',
      content
    }
  }

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_FILTER':
          return action.content
        case 'EMPTY':
          return initialState
        default:
          return state
      }
}

export default filterReducer