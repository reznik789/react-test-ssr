import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/index";

class UsersList extends Component {
  componentDidMount() {
      this.props.fetchUsers();
  }

  _renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
        Here's list of users:
        <ul>{this._renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { fetchUsers })(UsersList);
