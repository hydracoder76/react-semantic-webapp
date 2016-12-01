import { transaction } from 'mobx'
import authStore from '../stores/authStore';
import { BASE_URL } from '../constants/authentication';
import axios from 'axios';

export function signUp(formData) {
  /**
   * handle sign up process
   * sets appropirate messages
   */
  axios.post(`${BASE_URL}/users`, {
    user: formData
  }).then(function(response){
      let message = response.data.status;
      transaction(() => {
        authStore.setSignUpSuccess(message);
        authStore.setSignUpError(null);
      });
  }).catch(function(error){
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
  ).then(function(response){
      let token = response.data.auth_token;
      localStorage.setItem('jwt', token);
      authStore.setJwt(token);
  }).catch(function(error){
      let message = error.response.data.error;
      authStore.setSignInError(message);
  })
}

export function facebookSignIn(token) {
  /**
   * handle facebook signup and signin
   * sends token to backend and updates view accordingly
   */
  console.log("fb token", token);
  if(!token) {
    authStore.setFacebookError("Facebook login could not be completed!");
    return;
  }

  axios.post(`${BASE_URL}/users/facebook_login`, {
    token
  }).then(function(response) {
      console.log("facebook response", response.data);
      let token = response.data.auth_token;
      localStorage.setItem('jwt', token);
      authStore.setJwt(token);
  }).catch(function(error) {
      console.log("facebook error", error.response.data);
      let message = error.response.data.error;
      authStore.setFacebookError(message);
  })
}
