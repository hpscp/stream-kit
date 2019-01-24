import React from 'react';
import { Link } from "react-router-dom";

import s from './notfound.module.css';

const NotFound = () => (
  <div className={s.box}>
    <div className={s.link}>
      <Link className={s.link} to="/">
        <div className={s.header}> 404</div>
      </Link>
      <Link className={s.link} to="/">
        <div className={s.subheader}>Welp... this page does not exist.</div>
      </Link>
    </div>
  </div>
);


export default NotFound;