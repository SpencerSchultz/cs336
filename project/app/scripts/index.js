import React from 'react';
import ReactDOM from 'react-dom';

import LinkBox from './linkBox';

import '../css/base.css';

ReactDOM.render(
  <LinkBox url="/api/links" />,
  document.getElementById('content')
);
