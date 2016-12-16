import React from 'react'
import { Menu,  Input, List} from 'semantic-ui-react';
import SidebarItem from '../SidebarItem';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchInput: ""};
  }

  getFilteredAccounts = (accounts, searchInput="") => {
    let regex = new RegExp(`[A-Za-z0-9]?${searchInput}[A-Za-z0-9]?`)
    return this.props.accounts.filter((account) => {
      return (
        regex.test(account.name.toLowerCase()) ||
        regex.test(account.remote_source.toLowerCase()) ||
        regex.test(account.account_type.toLowerCase())
      );
    });
  }

  renderSidebarItems = () => {
    let accounts = this.getFilteredAccounts(this.props.accounts, this.state.searchInput);
    return accounts.map((account) =>{
      return <SidebarItem key={account.id} {...this.props} account={account}/>
    })
  }

  render () {
    // const activeItem = "home";

    return(
      <Menu vertical fixed="left" style={{padding: 0, width: 300}}>
        <Menu.Item header as='h1'>Shareito</Menu.Item>
        <Menu.Item>
          <Input
            icon='search'
            placeholder='Search Account..'
            onChange={(e, {value}) => {this.setState({searchInput: value})}}
          />
          <List relaxed divided size='huge'>
          {this.renderSidebarItems()}
          </List>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sidebar;
