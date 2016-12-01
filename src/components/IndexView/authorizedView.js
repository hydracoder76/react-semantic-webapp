import React from 'react'
import {
  Container, Grid, Menu,  Input, Label, Segment
} from 'semantic-ui-react';
import Navbar from '../Navbar';

class AuthorizedView extends React.Component {
  render () {
    const activeItem = 'inbox';
    return(
      <div>

        <Menu vertical fixed="left" style={{padding: 0, width: 250}}>
            <Menu.Item header as='h1'>Shareito</Menu.Item>
            <Menu.Item>
              <Input size='huge' icon='search' placeholder='Search mail...' />
            </Menu.Item>

            <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
              <Label color='teal'>1</Label>
              Inbox
            </Menu.Item>

            <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
              <Label>51</Label>
              Spam
            </Menu.Item>

            <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
              <Label>1</Label>
              Updates
            </Menu.Item>
          </Menu>
        <Navbar {...this.props}></Navbar>
        <div className="ui fluid" style={{marginLeft: 250, marginTop: 80, background: 'tan'}}>
          fdslfkajsdlkf
        </div>

      </div>
    )
  }
}

export default AuthorizedView;
