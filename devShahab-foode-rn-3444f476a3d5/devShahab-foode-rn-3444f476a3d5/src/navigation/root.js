import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { connect } from 'react-redux';
import _ from 'lodash'

import Login from '../screens/Login';
import Chat from '../screens/Chat';
import BottomTabs from './bottomTabs';
import LoadingComponent from '../components/LoadingComponent';
import preferences from '../common/preferences';
import { setUser } from "../store/actions/userSession";
import { setTheme, setLanguage } from "../store/actions/app";

import * as ApiServices from '../services'
import PermissionsManager from '../utils/PermissionsManager';
import LoginForm from '../screens/LoginForm';
import HomeScreen from '../screens/Home.Screen';
const Stack = createStackNavigator();
enableScreens();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} /> 
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const RootNavigator = (props) => {
  const { theme, user, setLanguage } = props
  const [loading, setLoading] = useState(true)

  async function onMount() {
    PermissionsManager.chechPermissionStatus()
    preferences.getLocalization().then(languageTag => {
      setLanguage(languageTag)
      ApiServices.ipService().then(response => {
        if (response.country_code == 'EC') {
          setLanguage('es')
        }
      })
    }).catch(error => {
      console.log('RootStack', 'getLocalization-error', error)
    })

    try {
      setLoading(true)

      const savedSession = await preferences.getAuthSession()
      const userSession = await ApiServices.verifySession()
      // preferences.setAuthSession({
      //   accessToken: userSession.session.jwt,
      // })
      props.setUser(userSession)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    onMount()
  }, [])

  return (
    <NavigationContainer
      theme={{
        dark: theme.name === 'dark',
        colors: {
          primary: theme.primary,
          background: theme.background,
          text: theme.text,
          card: theme.card,
          border: theme.border,
          notification: theme.notification,
        }
      }}
    >
      <Stack.Navigator headerMode="none" initialRouteName='Auth'>
        {loading ? (
          <Stack.Screen name="Loading" component={LoadingComponent} />
        ) : _.isNil(user) ? (
            <Stack.Screen name="Auth" component={AuthStack} />

        ) : (
              <>
                <Stack.Screen name="Main" component={BottomTabs} />

              </>
            )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  const { app, userSession } = state

  return {
    theme: app.theme,
    user: userSession.user
  };
};

export default connect(
  mapStateToProps,
  {
    setUser,
    setLanguage
  },
)(RootNavigator);
