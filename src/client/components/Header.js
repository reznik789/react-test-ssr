import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({auth}) => {
  console.log('My auth status', auth);
  return (
    <div>
      <Link to="/">React SSR</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Header);
