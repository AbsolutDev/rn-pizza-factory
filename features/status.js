//Action Creators
export const setConfirmExit = (mode) => {
  return {
    type: 'setConfirmExit',
    payload: mode
  }
}

//Cart reducer function
const initStatus = {
  confirmExit: false
}

export const statusReducer = (state = initStatus, action) => {
  switch(action.type) {
    case 'setConfirmExit':
      return {...state, confirmExit: action.payload}
      break;
    default:
      return state;
  }
}

//Selectors
export const selectConfirmExit = state => {
  return state.status.confirmExit;
}