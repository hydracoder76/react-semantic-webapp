import React from 'react'
import { Container, Form, Menu,  Icon} from 'semantic-ui-react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { observer } from 'mobx-react';

const AuthorizedView = observer(class AuthorizedView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: "content"
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state;
    return(
      <div>
        <Sidebar {...this.props}></Sidebar>
        <div style={{marginLeft: 300}}>
          <Navbar {...this.props} />
          <Menu fluid widths={4} attached color="blue">
            <Menu.Item
              name='content'
              active={activeItem === 'content'}
              onClick={this.handleItemClick}
            >
              <Icon name="write"/>
              Content
            </Menu.Item>
            <Menu.Item
              name='analytics'
              active={activeItem === 'analytics'}
              onClick={this.handleItemClick}
            >
              <Icon name="area chart"/>
              Analytics
            </Menu.Item>
            <Menu.Item
              name='discover'
              active={activeItem === 'discover'}
              onClick={this.handleItemClick}
            >
              <Icon name="newspaper"/>
              Discover
            </Menu.Item>
            <Menu.Item
              name='schedule'
              active={activeItem === 'schedule'}
              onClick={this.handleItemClick}
            >
              <Icon name="calendar"/>
              Schedule
            </Menu.Item>

          </Menu>
          <Container text className="post-container">
            <Form>
              <Form.TextArea
                name='post'
                placeholder='What will you like to share today?'
                rows='5'
              />
            <Form.Group>
              <Form.Button primary>Schedule</Form.Button>
              <Form.Button primary basic>Post Now</Form.Button>
            </Form.Group>

            </Form>
          </Container>
        </div>
      </div>
    )
  }
})

export default AuthorizedView;
