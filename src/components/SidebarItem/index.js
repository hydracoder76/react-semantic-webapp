import React from 'react'
import { observer } from 'mobx-react';
import { Checkbox, List, Image} from 'semantic-ui-react';
import { getRemoteSourceName, getAccountTypeName } from '../../utils/accountsHelper';

const SidebarItem = observer((props) => {
  const account = props.account;
  const isChecked = () => {
    return props.selectedAccounts.slice().indexOf(props.account.id) > -1
  }

  return (
    <List.Item>
      <List.Content floated='right'>
        <Checkbox toggle
          checked={isChecked()}
          onChange={() => props.handleSelectedAccountChange(account.id)}
        />
      </List.Content>
      <Image avatar src={account.image} />
      <List.Content>
        <h5 className="sidebar-heading">{account.name}</h5>
        <div className="sidebar-subtext">
          {`${getRemoteSourceName(account.remote_source)} ${getAccountTypeName(account.account_type)}`}
        </div>
      </List.Content>

    </List.Item>
  )
})

export default SidebarItem
