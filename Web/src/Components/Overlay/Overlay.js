import React, { Component } from 'react';

import s from './overlay.module.css';

class Overlay extends Component {

  render() {
    return (
      <div className={s.container}>
        Overlay
      </div>
    )
  }
}

export default Overlay;