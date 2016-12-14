import { transaction } from 'mobx'
import authStore from '../stores/authStore';
import accountStore from '../stores/accountStore';
import { BASE_URL } from '../constants/authentication';
import axios from 'axios';


function getAxiosInstance(token) {
  return axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': token}
  });
}


export function signUp(formData) {
  /**
   * handle sign up process
   * sets appropirate messages
   */
  axios.post(`${BASE_URL}/users`, {
    user: formData
  }).then((response) => {
      let message = response.data.status;
      transaction(() => {
        authStore.setSignUpSuccess(message);
        authStore.setSignUpError(null);
      });
  }).catch((error) => {
      let message = error.response.data.errors;
      transaction(() => {
        authStore.setSignUpSuccess(null);
        authStore.setSignUpError(message);
      });
  })
};


export function signIn(formData) {
  /**
   * hanlde sign in
   * sets jwt to local storage
   * sets jwt to store and flash messages
   */
  axios.post(`${BASE_URL}/users/login`,
    formData
  ).then((response) => {
      let { auth_token, accounts } = response.data;
      handleLoginResponse(auth_token, accounts);
  }).catch((error) => {
      let message = error.response.data.error;
      authStore.setSignInError(message);
  })
}

export function facebookSignIn(token) {
  /**
   * handle facebook signup and signin
   * sends token to backend and updates view accordingly
   */
  if(!token) {
    authStore.setFacebookError("Facebook login could not be completed!");
    return;
  }

  axios.post(`${BASE_URL}/users/facebook_login`, {
    token
  }).then((response) => {
      let { auth_token, accounts } = response.data;
      handleLoginResponse(auth_token, accounts);
  }).catch((error) => {
      console.error("Facebook Error: ", error.response.data);
      let message = error.response.data.error;
      authStore.setFacebookError(message);
  });
}


export function signOut() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('accounts');
  authStore.clearJwt();
  accountStore.clearAccounts();
}


export function createAccounts({facebookToken, facebookIds}) {
  accountStore.toggleAccountLoading();
  let jwt = localStorage.jwt;
  getAxiosInstance(jwt).post(`${BASE_URL}/accounts`, {
    facebook_ids: facebookIds,
    facebook_token: facebookToken
  }).then((response) => {
      accountStore.toggleAccountLoading();
      let accounts = response.data.accounts;
      localStorage.setItem('accounts', JSON.stringify(accounts));
      accountStore.setAccounts(accounts);
  }).catch((error) => {
      accountStore.toggleAccountLoading();
      let message = error.response.data.error;
      console.error("Error when creating accounts,", message);
      accountStore.setAccountError(message);
  });
}


export function getAccounts(){
  let jwt = localStorage.jwt;
  getAxiosInstance(jwt).get(`${BASE_URL}/accounts`
  ).then((response) => {
    let accounts = response.data.accounts;
    accountStore.setAccounts(accounts);
  }).catch((error) => {
    let message = error.response.data.error;
    console.error("Error when fetching accounts", message);
    accountStore.setAccountError(message);
  });

}


/**
 * Helper methods
 * Refactor later to another file
 */

function handleLoginResponse(token, accounts) {
  /**
  * sets token and account to LS and state
  */
  authStore.setJwt(token);
  accountStore.setAccounts(accounts);
  localStorage.setItem('jwt', token);
  localStorage.setItem('accounts', JSON.stringify(accounts))
}
