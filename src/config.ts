const CLIENT_ID = '0oag3u37mPicl0skM4x6';
const OKTA_DOMAIN = 'dev-587152.okta.com';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const AUTH_CALLBACK_PATH = '/authorization-code/callback';
const REDIRECT_URI = `http://localhost:3001${AUTH_CALLBACK_PATH}`;
const SCOPES = ['openid', 'profile'];

export default {
  authCallbackPath: AUTH_CALLBACK_PATH,
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: SCOPES,
    pkce: true,
  },
};
