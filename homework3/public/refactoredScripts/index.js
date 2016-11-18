import React from 'react';
import ReactDOM from 'react-dom';

import PeopleBox from './peopleBox';

import '../css/base.css';

ReactDOM.render(
  <PeopleBox url="/fetchAll" />,
  document.getElementById('content')
);
