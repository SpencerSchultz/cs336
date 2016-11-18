import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import People from './people.js';

module.exports = React.createClass({
  render: function() {
    var peopleNodes = this.props.data.map(function(people) {
      return (
        <People _id={people._id} firstName={people.firstName} lastName={people.lastName} startDate={people.startDate}>
        </People>
      );
    });
    return (
      <div className="peopleList">
        {peopleNodes}
      </div>
    );
  }
});
