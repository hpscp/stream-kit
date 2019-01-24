import React from 'react';

import { IconPin } from '../../Icons';

import s from './commentItem.module.css';

const CommentItem = ({username, message, pin}) => {
  return (
    <div className={s.container}>
      <div className={s.username}>
        {username}
      </div>
      <div className={s.message}>
        {message}
        <div className={s.button} onClick={() => pin({data: {username, message}})}>
          <IconPin className={s.icon}/>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;