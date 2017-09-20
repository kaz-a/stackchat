import { createStore } from 'redux';

const store = createStore(reducer);
export default store;

const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const initialState = {
	messages: []
}

function reducer(state = initialState, action){
	switch (action.type){
		case GOT_MESSAGES_FROM_SERVER:
			return Object.assign({}, state,  { messages: action.messages })
		default:
			return state;
	}
}

// action creator
export const gotMessagesFromServer = (arrayMsg)=> {
	return { 
		type: GOT_MESSAGES_FROM_SERVER,
		messages: arrayMsg
	}
}