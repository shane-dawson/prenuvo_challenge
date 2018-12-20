import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import Header from './components/Header';
import { history } from './store';
import ImageGrid from './components/ImageGrid';
import SymptomForm from './components/SymptomForm';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path="/challenge1" component={ImageGrid} />
              <Route path="/challenge2" component={SymptomForm} />
            </Switch>
          </div>
        </ConnectedRouter>
      </>
    );
  }
}

export default hot(module)(App);
