import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {RootStackNav} from 'navigation';
import React, {useState, useCallback, useMemo} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {authorize, refresh, revoke, prefetchConfiguration} from 'react-native-app-auth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Page, Button, ButtonContainer, Form, FormLabel, FormValue, Heading} from './components';

const configs = {
  identityserver: {
    issuer: 'https://demo.duendesoftware.com',
    clientId: 'interactive.public',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.duendesoftware.com/connect/authorize',
    //   tokenEndpoint: 'https://demo.duendesoftware.com/connect/token',
    //   revocationEndpoint: 'https://demo.duendesoftware.com/connect/revoke'
    // }
  },
  auth0: {
    // From https://openidconnect.net/
    issuer: 'https://samples.auth0.com',
    clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
    redirectUrl: 'https://openidconnect.net/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://samples.auth0.com/authorize',
    //   tokenEndpoint: 'https://samples.auth0.com/oauth/token',
    //   revocationEndpoint: 'https://samples.auth0.com/oauth/revoke'
    // }
  },
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: '',
};

export const App2 = () => {
  const [authState, setAuthState] = useState(defaultAuthState);
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      connectionTimeoutSeconds: 5,
      ...configs.auth0,
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = configs[provider];
        const newAuthState = await authorize({
          ...config,
          connectionTimeoutSeconds: 5,
          iosPrefersEphemeralSession: true,
        });

        setAuthState({
          hasLoggedInOnce: true,
          provider,
          ...newAuthState,
        });
      } catch (error) {
        Alert.alert('Failed to log in', error.message);
      }
    },
    [authState],
  );

  const handleRefresh = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken,
      }));
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true,
      });

      setAuthState({
        provider: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken) {
      const config = configs[authState.provider];
      if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
        return true;
      }
    }
    return false;
  }, [authState]);

  return (
    <Page>
      {authState.accessToken ? (
        <Form>
          <FormLabel>accessToken</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>accessTokenExpirationDate</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>refreshToken</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>scopes</FormLabel>
          <FormValue>{authState.scopes.join(', ')}</FormValue>
        </Form>
      ) : (
        <Heading>{authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
      )}

      <ButtonContainer>
        {!authState.accessToken ? (
          <>
            <Button onPress={() => console.log('aaa')} text="aaaa" color="#DA2536" />
            <Button onPress={() => handleAuthorize('identityserver')} text="Authorize IdentityServer" color="#DA2536" />
            <Button onPress={() => handleAuthorize('auth0')} text="Authorize Auth0" color="#DA2536" />
          </>
        ) : null}
        {authState.refreshToken ? <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" /> : null}
        {showRevoke ? <Button onPress={handleRevoke} text="Revoke" color="#EF525B" /> : null}
      </ButtonContainer>
    </Page>
  );
};

//
//
//
//
//
//
//
//
//
//

const config1 = {
  issuer: 'https://login.microsoftonline.com/3d6063a2-9867-42f7-b8f3-c54023d52a52/v2.0', //'https://3d6063a2-9867-42f7-b8f3-c54023d52a52.b2clogin.com/3d6063a2-9867-42f7-b8f3-c54023d52a52.onmicrosoft.com/oauth2/v2.0',
  clientId: 'd6c76e27-0b18-4d0d-92aa-36dcd3e835f8',
  redirectUrl: 'com.myapp://oauth/redirect/',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

// ケアパス踏襲のconfig
const policy = 'B2C_1_SignupSignin_ConditionalMFA';
// const baseUrl = 'https://login.microsoftonline.com/3d6063a2-9867-42f7-b8f3-c54023d52a52/v2.0';
//
// https://github.com/FormidableLabs/react-native-app-auth/blob/main/docs/config-examples/azure-active-directory-b2c.md
const baseUrl =
  'https://3d6063a2-9867-42f7-b8f3-c54023d52a52.b2clogin.com/3d6063a2-9867-42f7-b8f3-c54023d52a52.onmicrosoft.com/oauth2/v2.0';
const clientId = 'd6c76e27-0b18-4d0d-92aa-36dcd3e835f8';
const config2 = {
  clientId,
  redirectUrl: 'com.myapp://oauth/redirect/',
  serviceConfiguration: {
    authorizationEndpoint: `${baseUrl}/authorize`,
    tokenEndpoint: `${baseUrl}/token?p=${policy}`,
  },
  scopes: ['offline_access', clientId],
  additionalParameters: {
    p: policy,
    prompt: 'login',
  },
};

// 以下のconfigで瀧さんのAzureADB2Cに接続できた
const baseUrl2 = 'https://appauth22222.b2clogin.com/appauth22222.onmicrosoft.com/oauth2/v2.0/';
const config = {
  clientId,
  redirectUrl: 'https://jet.ms/',
  serviceConfiguration: {
    authorizationEndpoint: `${baseUrl2}/authorize`,
    tokenEndpoint: `${baseUrl2}/token?p=${policy}`,
  },
  scopes: ['openid'],
  additionalParameters: {
    p: 'B2C_1_signup_signin',
    prompt: 'login',
    nonce: 'defaultNonce',
  },
};
// https://appauth22222.b2clogin.com/appauth22222.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signup_signin&client_id=d6c76e27-0b18-4d0d-92aa-36dcd3e835f8&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjet.ms%2F&scope=openid&response_type=code&prompt=login
// https://appauth22222.b2clogin.com/appauth22222.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signup_signin&client_id=d6c76e27-0b18-4d0d-92aa-36dcd3e835f8&nonce=defaultNonce&redirect_uri=https%et.ms/&scope=openid&response_type=code&prompt=login
// %3A%2F%2F
// // Log in to get an authentication token
// const authState = await authorize(config);

// // Refresh token
// const refreshedState = await refresh(config, {
//   refreshToken: authState.refreshToken,
// });

export const App = () => {
  // return (
  //   <GestureHandlerRootView style={StyleSheet.absoluteFill}>
  //     <StatusBar style="auto" />
  //     <NavigationContainer>
  //       <RootStackNav />
  //     </NavigationContainer>
  //   </GestureHandlerRootView>
  // );

  const defaultAuthState = {
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
  };

  const [authState, setAuthState] = useState(defaultAuthState);
  // React.useEffect(() => {
  //   prefetchConfiguration({
  //     warmAndPrefetchChrome: true,
  //     connectionTimeoutSeconds: 5,
  //     ...configs.auth0,
  //   });
  // }, []);

  const handleAuthorize = useCallback(async provider => {
    try {
      // const config = configs[provider];
      // const newAuthState = await authorize({
      //   ...config,
      //   connectionTimeoutSeconds: 5,
      //   iosPrefersEphemeralSession: true,
      // });
      // setAuthState({
      //   hasLoggedInOnce: true,
      //   provider,
      //   ...newAuthState,
      // });

      console.log('in handleAuthorize');

      const newAuthState = await authorize(config);
      setAuthState({
        hasLoggedInOnce: true,
        provider,
        ...newAuthState,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to log in', error.message);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      // const config = configs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken,
      }));
    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      // const config = configs[authState.provider];
      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true,
      });

      setAuthState({
        provider: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken) {
      // const config = configs[authState.provider];
      if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
        return true;
      }
    }
    return false;
  }, [authState]);

  return (
    <Page>
      {authState.accessToken ? (
        <Form>
          <FormLabel>accessToken</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>accessTokenExpirationDate</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>refreshToken</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>scopes</FormLabel>
          <FormValue>{authState.scopes.join(', ')}</FormValue>
        </Form>
      ) : (
        <Heading>{authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
      )}

      <ButtonContainer>
        {!authState.accessToken ? (
          <>
            <Button onPress={() => console.log('aaa')} text="aaaa" color="#DA2536" />
            <Button onPress={() => handleAuthorize('identityserver')} text="Authorize IdentityServer" color="#DA2536" />
            <Button onPress={() => handleAuthorize('auth0')} text="Authorize Auth0" color="#DA2536" />
          </>
        ) : null}
        {authState.refreshToken ? <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" /> : null}
        {showRevoke ? <Button onPress={handleRevoke} text="Revoke" color="#EF525B" /> : null}
      </ButtonContainer>
    </Page>
  );
};
