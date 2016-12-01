import React from 'react';
import {
  Button, Divider, Form, Icon, Message, Modal
} from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login';

import { signIn, facebookSignIn } from '../../services/api';

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalOpen: false};
  }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleClose = (e) => {
    this.setState({modalOpen: false});
    this.props.resetAllMessages();
  }

  handleSignIn = (e, serializedForm) => {
    e.preventDefault();
    signIn(serializedForm);
    // get a token and send to the backend
  };

  responseFacebook = (response) => {
    facebookSignIn(response.accessToken);
  }

  render() {
    return(
      <Modal
        size="small"
        trigger={<Button basic primary onClick={this.handleOpen}>Sign In</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
         Sign In
        </Modal.Header>
        <Modal.Content>
          {
            this.props.signInError?
            <Message error header={this.props.signInError}/> : ""
          }
          <Button.Group fluid>
            {/*
              React FacebookLogin login
              https://www.npmjs.com/package/react-facebook-login
            */}
            <FacebookLogin
              appId="1339760112701385"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              scope="public_profile,read_insights,manage_pages,publish_pages,publish_actions"
              cssClass="ui facebook large button"
              icon={<Icon name="facebook" />}
            />
            <Button disabled  size="large"  color='twitter'>
              <Icon name='twitter' /> Twitter
            </Button>
            <Button disabled size="large"  color='google plus'>
              <Icon name='google plus' /> Google Plus
            </Button>
          </Button.Group>
          <Divider horizontal>Or</Divider>

          <Form id="signin" onSubmit={this.handleSignIn}>
            <Form.Input required label="Email"
              name="email"
              type="email"
              placeholder="jhondoe@hemail.com"
            />
            <Form.Input required label="Password"
              type="password"
              name="password"
              placeholder="password"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic negative onClick={this.handleClose}>
            Cancel
          </Button>
          <Button positive type="submit" icon='checkmark'
            labelPosition='right' content='Sign In' form="signin"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

SignInModal.propTypes = {

};

SignInModal.defaultProps = {
};

export default SignInModal;
