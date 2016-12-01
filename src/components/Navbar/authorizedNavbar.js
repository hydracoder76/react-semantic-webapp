import React from 'react'
import {
  Dropdown, Menu, Icon
} from 'semantic-ui-react';

class AuthorizedNavbar extends React.Component {
  render () {
    return(
      <Menu borderless fluid  fixed='top' style={{height: 80}}>
        <Menu.Item header as='h1'>Shareito</Menu.Item>
        <Menu.Item
          name='features'

          onClick={this.handleItemClick}
        />

        {/* settings */}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Dropdown as={Menu.Item} icon='setting' simple>
              <Dropdown.Menu>
                <Dropdown.Item icon="calendar" text="Edit Schedule"/>
                <Dropdown.Item icon="refresh" text="Relink"/>
                <Dropdown.Item icon="trash" text="Clear Queue"/>
                <Dropdown.Divider />
                <Dropdown.Header></Dropdown.Header>
                <Dropdown.Item icon="sign out" text="Logout"/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default AuthorizedNavbar;
