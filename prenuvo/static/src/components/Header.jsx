import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

class Header extends React.Component {
  linkToChallengeOne = () => this.props.push('/challenge1/');

  linkToChallengeTwo = () => this.props.push('/challenge2/');

  render() {
    return (
      <Nav>
        <NavItem onClick={this.linkToChallengeOne}>ChallengeOne</NavItem>
        <NavItem onClick={this.linkToChallengeTwo}>ChallengeTwo</NavItem>
      </Nav>
    );
  }
}

export default (Header = connect(
  null,
  { push },
)(Header));
