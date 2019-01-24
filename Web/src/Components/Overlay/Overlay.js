import React, { Component } from 'react';
import io from 'socket.io-client';

import s from './overlay.module.css';

class Overlay extends Component {
  constructor() {
    super();
    this.state = {
      comment: null,
      socket: null,
    }
  }

  componentWillMount = () => {
    this.connect();
  }

  connect = () => {
    const socket = io('http://localhost:4001');
    this.setState({ socket: socket });
  }

  componentDidMount = () => { 
    const { socket } = this.state;
    socket.on('connect', () => {
      socket.emit('overlay.ready');
      console.log('connected')
    });

    socket.on('server.pin', (data) => {
      console.log('server.pin')
      this.handlePin(data);
    })

    socket.on('server.unpin', () => {
      this.handleUnpin();
    })

    socket.on('disconnect', () => {
      this.setState({
        socket: null,
      })
      this.connect();
    })
  }

  handlePin = (data) => {
    this.setState({
      comment: data,
    })
  }

  handleUnpin = () => {
    this.setState({
      comment: null,
    })
  }

  render() {
    return (
      <div className={s.container}>
        {
          this.state.comment 
          ? <div>{this.state.comment.username}: {this.state.comment.message}</div>
          : <div>no overlay</div>
        }
      </div>
    )
  }
}

export default Overlay;