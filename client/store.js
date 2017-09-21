import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

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
      // assign to an empty {} an old state and action item
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

// action creator (thunk creator) for ajax requests
export const fetchMessages = () => {
  return function thunk(dispatch){
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        // console.log(messages)
        const action = gotMessagesFromServer(messages)
        dispatch(action)
      })

  }
}
export function postMessage (message) {
  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  }
}

export const postNewMessage = (message) => {
  return function thunk(dispatch){
    return axios.post("/api/messages", message)
    .then(res => res.data)
    .then(newMessage => {
      const action = gotNewMessageFromServer(newMessage);
      dispatch(action);
      socket.emit('new-message', newMessage);
    })
  }
}

// store
const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));
export default store;


