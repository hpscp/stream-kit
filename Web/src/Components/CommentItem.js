import React from 'react';

import s from './commentItem.module.css';

const CommentItem = ({username, message}) => {
  return (
    <div className={s.container}>
      <div className={s.username}>
        {username}
      </div>
      <div className={s.message}>
        {message}
      </div>
    </div>
  );
};

export default CommentItem;