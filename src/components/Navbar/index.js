import React from 'react';
import AuthorizedNavbar from './authorizedNavbar';
import UnauthorizedNavbar from './unauthorizedNavbar';

class Navbar extends React.Component {
  render () {
    return(
      this.props.jwt?
      <AuthorizedNavbar  {...this.props}
      />
      :
      <UnauthorizedNavbar {...this.props}
      />
    )
  }
}

export default Navbar;
