import React, { Component } from 'react';
import io from 'socket.io-client';

import CommentItem from './CommentItem';
import s from './main.module.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: fakeData,
      socket: null,
    }
  };

  componentWillMount = () => {
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
  }

  handleData = ({user, message}) => {
    let newMessage = {username: user['display-name'], message: message}
    this.setState({
      data: [...this.state.data, newMessage],
    })
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
              {this.state.data.map((data, index) => (
                <CommentItem 
                  username={data.username} 
                  message={data.message} 
                  key={index}
                  />
              ))}
              </div>
            </div>
          </div>
          <div className={s.column}>
            <div className={s.iframe}>
              <iframe className={s.overlay} src={'http://localhost:3000/overlay'} title={'overlay'}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

const fakeData = [
  {
    username: 'n8',
    message: 'Wow this really is a test!'
  },
  {
    username: 'mike',
    message: 'it is my birthday :/'
  },
]
