import React from 'react'
import { Checkbox, Menu,  Input, List, Image} from 'semantic-ui-react';

class Sidebar extends React.Component {
  render () {
    const activeItem = "home";
    return(
      <Menu vertical fixed="left" style={{padding: 0, width: 300}}>
        <Menu.Item header as='h1'>Shareito</Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search Account..' />
          <List relaxed divided size='huge'>
            <List.Item>
              <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg' />
              <List.Content>
                <List.Header>Snickerdoodle </List.Header>
                <div className="sidebar-subtext">Twitter</div>
              </List.Content>
              <List.Content floated='right'>
                <Checkbox toggle className=""></Checkbox>
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='http://semantic-ui.com/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Poodle</List.Header>
                <div className="sidebar-subtext">Facebook</div>
              </List.Content>
              <List.Content floated='right'>
                <Checkbox toggle className=""></Checkbox>
              </List.Content>

            </List.Item>
          </List>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sidebar;
