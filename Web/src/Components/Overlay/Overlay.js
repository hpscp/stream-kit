import React, { Component } from 'react';
import io from 'socket.io-client';

import s from './overlay.module.css';

class Overlay extends Component {
  constructor() {
    super();
    this.state = {
      comment: null,
      socket: null,
      animationClass: null,
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
    });

    socket.on('server.pin', (data) => {
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
    if (JSON.stringify(this.state.comment) === JSON.stringify(data)) {
      this.setState({
        animationClass: s.commentExit
      })
      setTimeout(() => {
        this.setState({
          comment: null,
        })
      }, 500)
    } else {
      this.setState({
        comment: data,
        animationClass: s.commentEnter,
      })
    }

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
          ? <div className={`${s.comment} ${this.state.animationClass}`}>
              <div className={s.username}>
                {this.state.comment.username}
              </div>
              <div className={s.message}>
                {this.state.comment.message}
              </div>
            </div>
          : <div>no overlay</div>
        }
      </div>
    )
  }
}

export default Overlay;