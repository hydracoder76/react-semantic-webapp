import React from 'react'
import { observer } from 'mobx-react';
import { Button, Header, Image, List, Message } from 'semantic-ui-react';
import _ from 'lodash';

const AccountImportList =  observer(class AccountImportList extends React.Component {
  renderItem = ({name, id, image, type, selected, addCallback, removeCallback}) => {
    return(
      <List.Item key={id}>
        <List.Content floated='right'>
          {
            _.indexOf(selected, id) === -1 ?
            <Button primary onClick={() => {addCallback(id)}}> Add </Button> :
            <Button negative basic onClick={() => {removeCallback(id)}}>Remove</Button>
          }
        </List.Content>
          <Image avatar src={image} />
        <List.Content>
          <Header as='h5'>{name}</Header>
          {type}
        </List.Content>
      </List.Item>
    );
  }

  renderFacebookProfileItem = () => {
    let profile = this.props.facebookProfile;

    if(profile.has("name")) {
      return this.renderItem({
        name: profile.get("name"),
        id: profile.get("id"),
        image: profile.get("picture").data.url,
        type: "Facebook Profile",
        selected: this.props.facebookIds.slice(),
        addCallback: this.props.addFacebookAccount,
        removeCallback: this.props.removeFacebookAccount,
      })
    }
  }

  renderFacebookPageItems = () => {
    let pages = this.props.facebookPages.slice();

    let items = pages.map((page) => {
      return(
        this.renderItem({
          name: page.name,
          id: page.id,
          image: page.picture.data.url,
          type: "Facebook Page",
          selected: this.props.facebookIds.slice(),
          addCallback: this.props.addFacebookAccount,
          removeCallback: this.props.removeFacebookAccount,
        })
      );
    });
    return items;
  }

  renderFacebookGroupItems = () => {
    let groups = this.props.facebookGroups.slice();

    let items = groups.map((group) => {
      return(
        this.renderItem({
          name: group.name,
          id: group.id,
          image: group.picture.data.url,
          type: "Facebook Group",
          selected: this.props.facebookIds.slice(),
          addCallback: this.props.addFacebookAccount,
          removeCallback: this.props.removeFacebookAccount,
        })
      );
    });
    return items;
  }

  shouldRenderMessage = () => {
    let { facebookProfile } = this.props;
    if(facebookProfile.has("id")) {
      return true;
    }
  }

  render () {
    return(
      <div>
        {
          this.shouldRenderMessage() > 0 ?
          <Message info>
            Click <b>add</b> on all accounts you want to use on Shareito!
          </Message> : ""
        }
        <List divided verticalAlign='middle' relaxed>
          {this.renderFacebookProfileItem()}
          {this.renderFacebookPageItems()}
          {this.renderFacebookGroupItems()}
        </List>
      </div>
    )
  }
})

export default AccountImportList;
