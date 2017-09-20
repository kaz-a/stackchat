import { createStore } from 'redux';

// action types
const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGES_FROM_SERVER"

// initial state
const initialState = {
	messages: [], 
  newMessage: ""
}



// reducer
function reducer(state = initialState, action){
	switch (action.type){ // if the action's type is ..., 
		case GOT_MESSAGES_FROM_SERVER:
      // assign to an empty {} with old state and action item
			return Object.assign({}, state,  { messages: action.messages })
    case WRITE_MESSAGE:
      return Object.assign({}, state, { newMessage: action.newMessage})
    case GOT_NEW_MESSAGE_FROM_SERVER:
      // avoid mutation by concatenating instead of pushing (because push will push an array into an array)
      return Object.assign({}, state, { messages: state.messages.concat(action.messages) })
		default:
			return state;
	}
}

// action creators
export const gotMessagesFromServer = (arrayMsg)=> {
	return { 
		type: GOT_MESSAGES_FROM_SERVER, // action type
		messages: arrayMsg
	}
}

export const writeMessage = (newMsg) => {
  return {
    type: WRITE_MESSAGE,
    newMessage: newMsg
  }
}

export const gotNewMessageFromServer = (arrayMsg) => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    messages: arrayMsg
  }
}

// store
const store = createStore(reducer);
export default store;


