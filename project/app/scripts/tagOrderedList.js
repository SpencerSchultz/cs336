import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Link from './link.js';

module.exports = React.createClass({
  render: function() {
    var linkNodes = this.props.data.map(function(link) {
      return (
        <div className="tagAndList">
          <tagTag>{link.tag1}</tagTag>
          <p><a href={link.link}>{link.nickName}</a></p>
        </div>
      );
    });
    return (
      <div className="tagOrderedList">
        {linkNodes}
      </div>
    );
  }
});
