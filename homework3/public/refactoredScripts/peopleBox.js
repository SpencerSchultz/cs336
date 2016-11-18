import React from 'react';
import $ from 'jquery';

import PeopleList from './peopleList.js';
import PeopleForm from './peopleForm.js';

module.exports = React.createClass({
  loadPeoplesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePeopleSubmit: function(people) {
    var peoples = this.state.data;
    var newPeoples = peoples.concat([people]);
    this.setState({data: newPeoples});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: people,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: peoples});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeoplesFromServer();
    setInterval(this.loadPeoplesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="peopleBox">
        <h1>People</h1>
        <PeopleForm onPeopleSubmit={this.handlePeopleSubmit} />
        <PeopleList data={this.state.data} />
      </div>
    );
  }
});
