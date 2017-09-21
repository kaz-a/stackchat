import React, { Component } from 'react';
import store, { writeMessage, gotNewMessageFromServer, postNewMessage } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor(){
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleChange(event){
    // console.log(event.target.value)
    const action = writeMessage(event.target.value);
    store.dispatch(action);
  }

  handleSubmit(event){
    event.preventDefault();

    const newMessageContent = this.state.newMessage;
    const channelId = this.props.channelId;
    
    // axios.post("/api/messages", { content: newMessageContent, channelId: channelId })
    // .then(res => res.data)
    // .then(message => {
    //   const action = gotNewMessageFromServer(message)
    //   store.dispatch(action)
    //   socket.emit("new-message", message);
    // })

    const thunkAction = postNewMessage({ content: newMessageContent, channelId: channelId });
    store.dispatch(thunkAction)
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={ this.handleSubmit }>
        <div className="input-group input-group-lg">
          <input onChange={ this.handleChange }
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
