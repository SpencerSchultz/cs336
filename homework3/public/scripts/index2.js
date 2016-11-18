var People = React.createClass({

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

var PeopleList = React.createClass({
  render: function() {
    var peopleNodes = this.props.data.map(function(people) {
      return (
        <People key={people._id} _id={people._id} firstName={people.firstName} lastName={people.lastName} startDate={people.startDate}>
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

var PeopleForm = React.createClass({
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
          placeholder="person's id"
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

var PeopleBox = React.createClass({
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
        <h1>People Page</h1>
        <PeopleForm onPeopleSubmit={this.handlePeopleSubmit} />
        <PeopleList data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <PeopleBox url="/fetchAll" />,
  document.getElementById('content')
);
