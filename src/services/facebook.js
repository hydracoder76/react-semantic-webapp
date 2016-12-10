import axios from 'axios';

class Facebook {
  static getPages(token, onSuccess, onFailure) {
    const endpoint = 'https://graph.facebook.com/me/accounts';
    axios.get(endpoint, {params: {access_token: token, fields: "name, id, picture"}})
      .then(onSuccess)
      .catch(onFailure);
  }

  static getGroups(token, onSuccess, onFailure) {
    const endpoint = 'https://graph.facebook.com/me/groups';
    axios.get(endpoint, {params: {access_token: token, fields: "name, id, picture"}})
      .then(onSuccess)
      .catch(onFailure);
  }
}

export default Facebook;
