
import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.toString());
    return { __html: rawMarkup };

  },

  render: function() {
    return (
      <div className="person">
        <h2 className="_id">
          {this.props._id}
        </h2>
        <infoBlip className="firstName">
          {this.props.firstName}
        </infoBlip>
        <infoBlip className="lastName">
          {this.props.lastName}
        </infoBlip>
        <infoBlip className="startDate">
          {this.props.startDate}
        </infoBlip>
      </div>
    );
  }
});
