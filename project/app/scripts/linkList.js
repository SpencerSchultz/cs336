import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import TagOrderedList from './tagOrderedList.js';

module.exports = React.createClass({
  render: function() {
    return (
      <div className="linkList">
        <h1>Links</h1>
        <TagOrderedList data={this.children.data} />
      </div>
    );
  }
});
