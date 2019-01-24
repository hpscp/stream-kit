import React, { Component } from 'react';
import io from 'socket.io-client';

import CommentItem from './CommentItem';
import s from './main.module.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      socket: null,
      twitch: false,
      overlay: 'http://localhost:3000/overlay',
    }
  };

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
      socket.emit('client.ready');
    });

    socket.on('server.chat', ( data ) => {
      this.handleData(data);
    })

    socket.on('server.twitchConnect', () => {
      this.setState({
        twitch: true,
      });
    })

    socket.on('server.twitchDisconnect', () => {
      this.setState({
        twitch: false,
      })
    })

    socket.on('disconnect', () => {
      this.setState({
        socket: null,
        twitch: false,
      })
      this.connect();
    })
  }

  handleData = ({user, message}) => {
    let newMessage = {username: user['display-name'], message: message}
    this.setState({
      data: [...this.state.data, newMessage],
    })
  }

  handlePin = ({data}) => {
    const { socket } = this.state;
    socket.emit('client.pin', data)
  }

  render() {
    return (
      <div className={s.container}>
        <header className={s.header}>
          Stream-Kit
        </header>
        <div className={s.body}>
          <div className={s.column}>
            <div className={s.comments}>
              <header className={s.h2}>
                Comment Feed
              </header>
              <div className={s.commentBody}>
                {
                  this.state.twitch
                    ? <div className={s.twitchTrue}>&#8226; Twitch Connection Online </div>
                    : <div className={s.twitchFalse}>&#8226; Twitch Connection Offline </div>
                }
              
              {this.state.data.map((data, index) => (
                <CommentItem 
                  username={data.username} 
                  message={data.message} 
                  pin={this.handlePin}
                  key={index}
                  />
              ))}
              </div>
            </div>
          </div>
          <div className={s.column}>
            <div className={s.h2}> Overlay </div>
            <div className={s.wrap}>
              <iframe className={s.iframe} scrolling="no" src={this.state.overlay} title={'overlay'}/>
            </div>
            <div className={s.h3}> {this.state.overlay} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
