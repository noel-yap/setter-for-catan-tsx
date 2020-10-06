import React from 'react';

import {Button, Typography} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';

import {useOktaAuth} from '@okta/okta-react';

import SetterForCatan from './SetterForCatan';

import mui from './mui';

const Home = () => {
  const {authState, authService} = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading…</div>;
  }

  const logoutButton = (
    <Button
      id="logout-button"
      color="primary"
      onClick={() => {
        authService.logout();
      }}
    >
      <Typography variant="h4">Logout</Typography>
    </Button>
  );
  const loginButton = (
    <Button
      id="login-button"
      color="primary"
      onClick={() => {
        authService.login();
      }}
    >
      <Typography variant="h4">Login</Typography>
    </Button>
  );
  const logInOutButton = authState.isAuthenticated ? logoutButton : loginButton;

  return (
    <div className="App">
      <header className="App-body">
        <MuiThemeProvider theme={mui.theme}>
          <SetterForCatan />
          {logInOutButton}
        </MuiThemeProvider>
      </header>
    </div>
  );
};

export default Home;
