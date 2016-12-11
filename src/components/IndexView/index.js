import React from 'react'
import { observer, inject } from 'mobx-react';
import UnauthorizedView from './unauthorizedView';
import AuthorizedView from './authorizedView';
import FirstTimeView from './firstTimeView';
import { signIn, signUp } from '../../services/api';

const IndexViewContainer = inject('authStore', 'accountStore')(observer(( { authStore, accountStore }) => {
  // TODO: based on jwt token render the appropriate views.

  return(
    authStore.jwt?
      accountStore.accounts.length === 0 ?
      <FirstTimeView { ...accountStore }
      /> :
      <AuthorizedView
        jwt={authStore.jwt}
        accounts={accountStore.accounts}
      />
    :
    <UnauthorizedView
      jwt={authStore.jwt}
      signUpError={authStore.signUpError}
      signUpSuccess={authStore.signUpSuccess}
      signInError={authStore.signInError}
      facebookError={authStore.facebookError}
      handleSignUp={signUp}
      handleSignIn={signIn}
      resetAllMessages={authStore.resetAllMessages}
    />
  );
}));

export default IndexViewContainer
