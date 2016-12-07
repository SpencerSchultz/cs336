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
  handleLinkSubmit: function(link) {
    var links = this.state.data;
    link._id = Date.now();
    var newLinks = links.concat([link]);
    this.setState({data: newLinks});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: links});
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
        <h1>Link DB</h1>
        <LinkForm onLinkSubmit={this.handleLinkSubmit}/>
        <TagOrderedList data={this.state.data} />
      </div>
    );
  }
});
