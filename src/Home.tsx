import React, {useState, useEffect} from 'react';

import {Button, Typography} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';

// @ts-ignore
import {useOktaAuth} from '@okta/okta-react';

import SetterForCatan from './SetterForCatan';

import mui from './mui';

const Home = () => {
  const {authState, authService} = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      authService.getUser().then((info: any) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  return (
    <div className="App">
      <header className="App-body">
        <MuiThemeProvider theme={mui.theme}>
          <Typography id="title" variant="h3">
            Setter for Catan
          </Typography>
          {userInfo ? (
            <div>
              <SetterForCatan />
              <Button
                id="logout-button"
                color="primary"
                onClick={async () => {
                  authService.logout('/login');
                }}
              >
                <Typography variant="h4">Logout</Typography>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                id="login-button"
                color="primary"
                onClick={async () => {
                  authService.login('/');
                }}
              >
                <Typography variant="h4">Login</Typography>
              </Button>
            </div>
          )}
        </MuiThemeProvider>
      </header>
    </div>
  );
};

export default Home;
