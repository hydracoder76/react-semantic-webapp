import { useStrict } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'semantic-ui-css/semantic.css';

useStrict(true);

// Components
import App from './App';
import IndexViewContainer from './components/IndexView';
// Stores
import authStore from './stores/authStore';
import accountStore from './stores/accountStore';
import postStore from './stores/postStore';
// Styles
import './index.css';


const stores = { authStore, accountStore, postStore };

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={IndexViewContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
