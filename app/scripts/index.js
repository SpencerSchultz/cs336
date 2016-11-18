import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './commentBox';

import '../css/base.css';

ReactDOM.render(
  <CommentBox url="/api/comments" />,
  document.getElementById('content')
);
