import React from 'react'
import {
  Dropdown, Menu
} from 'semantic-ui-react';

class AuthorizedNavbar extends React.Component {
  render () {
    return(
      <Menu borderless fluid attached="top">
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
                <Dropdown.Item icon="sign out" text="Logout" onClick={this.props.signOut}/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default AuthorizedNavbar;
