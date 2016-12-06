import React from 'react';
import $ from 'jquery';

import TagOrderedList from './tagOrderedList.js';
import LinkForm from './linkForm.js';

module.exports = React.createClass({
  loadLinks: function() {
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
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadLinks();
    setInterval(this.loadLinks, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="linkBox">
        <LinkForm/>
        <TagOrderedList data={this.state.data} />
      </div>
    );
  }
});
