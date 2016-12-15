import React from 'react';
import {
  Menu,
} from 'semantic-ui-react';
import SignInModal from '../SignInModal';
import SignUpModal from '../SignUpModal';

class UnauthorizedNavbar extends React.Component {
  handleItemClick = (e, { name }) => {
    console.log(name)
  };

  render () {
    const activeItem = 'home';
    return(
      <Menu borderless>
        <Menu.Item header as='h1'>Shareito</Menu.Item>
        <Menu.Item
          name='features'
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='plans'
          active={activeItem === 'plans'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <SignUpModal { ...this.props }/>
          </Menu.Item>
          <Menu.Item>
            <SignInModal {...this.props}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

// UnauthorizedNavbar.propTypes = {
//   activeItem: React.PropTypes.string.isRequired,
// };
//
// UnauthorizedNavbar.defaultProps = {
//   activeItem: "home",
// }


export default UnauthorizedNavbar;
