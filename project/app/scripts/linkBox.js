import React from 'react';
import $ from 'jquery';

import TagOrderedList from './tagOrderedList.js';
import LinkForm from './linkForm.js';
import FilterBar from './filterBar.js';

import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
  loadLinks: function() {
    $.ajax({
      url: API_URL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleFilterUpdate: function(value) {
    this.setState({
      filterText: value
    })
  },
  handleLinkSubmit: function(link) {
    var links = this.state.data;
    link._id = Date.now();
    var newLinks = links.concat([link]);
    this.setState({data: newLinks});
    $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: links});
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: [],
      filterText: ''
    };
  },
  componentDidMount: function() {
    this.loadLinks();
    setInterval(this.loadLinks, POLL_INTERVAL);
  },
  render: function() {
    return (
      <div className="linkBox">
        <h1>Link DB</h1>
        <LinkForm onLinkSubmit={this.handleLinkSubmit}/>
        <FilterBar
          filterVal={this.state.filterText}
          handleFilterUpdate={this.handleFilterUpdate}
        />
        <TagOrderedList
          data={this.state.data}
          filter={this.state.filterText}
        />
      </div>
    );
  }
});
