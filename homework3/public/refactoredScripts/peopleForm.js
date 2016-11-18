import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {_id: '', firstName: '', lastName: '', startDate: ''};
  },
  handlePersonIDChange: function(e) {
    this.setState({_id: e.target.value});
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var _id = this.state._id.trim();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var startDate = this.state.startDate.trim();
    if (!_id || !firstName || !lastName || !startDate) {
      return;
    }
    this.props.onPeopleSubmit({_id: _id, firstName: firstName, lastName: lastName, startDate: startDate});
    this.setState({_id: '', firstName: '', lastName: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="peopleForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="person's name"
          value={this.state._id}
          onChange={this.handlePersonIDChange}
        />
        <input
          type="text"
          placeholder="person's first name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="person's last name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        />
        <input
          type="text"
          placeholder="person's start-date"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
});
