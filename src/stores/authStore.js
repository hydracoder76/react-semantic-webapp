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
      setJwt: action((token) => {
        this.jwt = token;
      }),
      setFacebookToken: action((token) => {
        this.facebookToken = token;
      }),
      setSignUpError: action((message) => {
        this.signUpError = message;
      }),
      setSignUpSuccess: action((message) => {
        this.signUpSuccess = message;
      }),
      setSignInError: action((message) => {
        this.signInError = message;
      }),
      setFacebookError: action((message) => {
        this.facebookError = message;
      }),
      resetAllMessages: action(() => {
        transaction(() => {
          this.signUpError = null;
          this.signUpSuccess = null;
          this.signInError = null;
          this.facebookError = null;
        })
      }),
      setAccounts: action((accounts) => {
        this.accounts = accounts;
      }),
      signOut: action(() => {
        this.jwt = null;
        localStorage.removeItem('jwt');
      }),
    });
  }
}

const authStore = new AuthStore();
export default authStore;
export { AuthStore };
