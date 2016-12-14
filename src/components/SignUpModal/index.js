import React from 'react';
import {
  Button, Divider, Form, Icon, Modal, Message
} from 'semantic-ui-react';
import FacebookLogin from '../FacebookLogin';

import { signUp, facebookSignIn } from '../../services/api';

class SignUpModal extends React.Component {
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

  handleSignUp = (e, serializedForm) => {
    e.preventDefault();
    signUp(serializedForm);
  };

  responseFacebook = (response) => {
    facebookSignIn(response.accessToken);
  }

  render() {
    return(
      <Modal
        size="small"
        trigger={<Button onClick={this.handleOpen} primary>Sign Up</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
         Sign Up
        </Modal.Header>
        <Modal.Content>
          {
            // Sign Up Error
            this.props.signUpError?
            <Message error
              header={"There was some errors with your submission"}
              list={this.props.signUpError.toJS()}/> : ""
          }
          {
            // Sign Up Success
            this.props.signUpSuccess?
            <Message success header={this.props.signUpSuccess}/> : ""
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
              textButton="Facebook"
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

          <Form id="signup" onSubmit={this.handleSignUp}>
            <Form.Input required label="Full Name"
              name="name"
              placeholder="Jhon Doe"
            />
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
            <Form.Input required  label="Password Again"
              type="password"
              name="password_confirmation"
              placeholder="password"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic negative onClick={this.handleClose}>
            Cancel
          </Button>
          <Button positive type="submit" icon='checkmark'
            labelPosition='right' content='Sign Up' form="signup"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

SignUpModal.propTypes = {

};

SignUpModal.defaultProps = {
};

export default SignUpModal;
