import React from 'react'
import { observer, inject } from 'mobx-react';
import UnauthorizedView from './unauthorizedView';
import AuthorizedView from './authorizedView';
import FirstTimeView from './firstTimeView';
import { signIn, signUp, signOut } from '../../services/api';

const IndexViewContainer = inject('authStore', 'accountStore')(observer(( { authStore, accountStore }) => {
  // TODO: based on jwt token render the appropriate views.

  return(
    authStore.jwt?
      accountStore.accounts.length === 0 ?
      <FirstTimeView { ...accountStore }
      /> :
      <AuthorizedView
        { ...accountStore}
        { ...authStore }
        signOut={signOut}
      />
    :
    <UnauthorizedView
      { ...authStore }
      handleSignUp={signUp}
      handleSignIn={signIn}
    />
  );
}));

export default IndexViewContainer
