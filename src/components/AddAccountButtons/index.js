import React from 'react'
import { observer } from 'mobx-react';
import { Button, Icon, Container } from 'semantic-ui-react';
import Facebook from '../../services/facebook';
import FacebookLogin from '../FacebookLogin';

const AddAccountButtons = observer(class AddAccountButtons extends React.Component {
  responseFacebook = (profileResponse) => {
    const token = profileResponse.accessToken;
    // set facebook profile
    this.props.setFacebookProfile(profileResponse);
    // set facebook pages
    Facebook.getPages(
      token,
      (response) => {this.props.setFacebookPages(response.data.data)},
      (error) => {console.error("error", error)}
    );
    // set facebook groups
    Facebook.getGroups(
      token,
      (response) => {this.props.setFacebookGroups(response.data.data)},
      (error) => {console.error("error", error)}
    );
  }

  render () {
    return(
      <Container textAlign="center">
        <Button.Group fluid>
          <FacebookLogin
            appId="1339760112701385"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            scope="public_profile,read_insights,manage_pages,publish_pages,publish_actions,user_managed_groups"
            cssClass="ui facebook button"
            textButton="Add Facebook Account"
            icon={<Icon name="facebook" />}
          />
          <Button color='twitter' disabled>
            <Icon name='twitter' /> Add Twitter Account
          </Button>
          <Button color='google plus' disabled>
            <Icon name='google plus' /> Add Google Plus Account
          </Button>
        </Button.Group>
      </Container>
    )
  }
})

export default AddAccountButtons;
