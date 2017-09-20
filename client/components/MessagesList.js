import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, { gotMessagesFromServer } from '../store';

export default class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  // "If I DID mount to you, let's call an ajax request
  //  and subscribe to the store for state changes"
  componentDidMount () {
    axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = gotMessagesFromServer(messages)
        store.dispatch(action)
      })


    // When we use store.subscribe, it returns an "unsubscribe" function 
    // that we can use to remove the listener. 
    // Capture this listener so the MessagesList component can get to it.
    this.unsubscribeFromStore = store.subscribe(() => this.setState( store.getState() ))
  }

  // "If I WILL be unmounting from you 
  // let's unsubscribe from the store right before I unmount"
  componentWillUnmount(){
    this.unsubscribeFromStore();
  }

  render () {
    // get the channelId from the url by using `this.props.match.params`
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;    
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}
