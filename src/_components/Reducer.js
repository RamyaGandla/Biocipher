const redux = require('redux')
const createStore = redux.createStore

// const Reducer = props => {

  const initialState = {
    loginStatus: '',
  }

  const actionReducer = (action, state = initialState) => {
    switch(action) {
      case 'login': return {
        loginStatus: 'LoginSuccess'
      }

      default: return state
    }
  }
// }

const store = createStore(actionReducer)
console.log("initial state", store.getState());
