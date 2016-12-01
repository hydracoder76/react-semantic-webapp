import { extendObservable, action, transaction } from 'mobx';

class  AuthStore {
  constructor() {
    extendObservable(this, {
      jwt: localStorage.getItem('jwt'),
      facebookToken: null,
      signUpError: null,
      signUpSuccess: null,
      signInError: null,
      facebookError: null,
      setJwt: action(function(token) {
        this.jwt = token;
      }),
      setFacebookToken: action(function(token) {
        this.facebookToken = token;
      }),
      setSignUpError: action(function(message) {
        this.signUpError = message;
      }),
      setSignUpSuccess: action(function(message) {
        this.signUpSuccess = message;
      }),
      setSignInError: action(function(message) {
        this.signInError = message;
      }),
      setFacebookError: action(function(message) {
        this.facebookError = message;
      }),
      resetAllMessages: action(function() {
        transaction(() => {
          this.signUpError = null;
          this.signUpSuccess = null;
          this.signInError = null;
          this.facebookError = null;
        })
      }),
    });
  }
}

const authStore = new AuthStore();
export default authStore;
export { AuthStore };
