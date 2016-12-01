import React from 'react'
import { observer, inject } from 'mobx-react';
import UnauthorizedView from './unauthorizedView';
import AuthorizedView from './authorizedView';
import { signIn, signUp } from '../../services/api';

const IndexViewContainer = inject('authStore')(observer(( { authStore }) => {
  // TODO: based on jwt token render the appropriate views.

  return(
    authStore.jwt?
    <AuthorizedView
      jwt={authStore.jwt}
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
