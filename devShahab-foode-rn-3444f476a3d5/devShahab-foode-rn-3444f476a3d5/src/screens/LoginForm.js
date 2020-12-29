import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import Input from '../components/InputField';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';
import { setUser } from "../store/actions/userSession";
import * as AuthServices from '../services'
import preferences from '../common/preferences';
import { translate } from '../language';
import { setTheme, setLanguage } from "../store/actions/app";
import { Button, Overlay } from 'react-native-elements';

const LoginForm = (props) => {
  const { navigation, theme, language, setLanguage} = props

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('pietroex')
  const [password, setPassword] = useState('ciao')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const toggleOverlay = () => {
    setLoginVisible(!loginVisible);
  };

  function validate() {
    if (email.length == 0) {
      setEmailError('Please enter username')
      return false
    }
    if (email.length == 0) {
      setPasswordError('Please enter password')
      return false
    }

    return true
  }

  function onLoginPress() {
    setLoading(true)
    setEmailError('')
    setPasswordError('')
    AuthServices.login(email, password).then(response => {
      console.log('AuthServices.login-response', response)
      preferences.setAuthSession({
        accessToken: response.token,
      }).then(() => {
        props.setUser(response)
      })
    }).catch(error => {
      console.log('AuthServices.login-error', error)
      setEmailError('')
      if (error.response.status == 401) {
        setPasswordError('Username or password is incorrect')
      } else {
        setPasswordError('Something went wrong')
      }
    }).finally(() => {
      setLoading(false)
    })

  }


  return(
  <>
    <View style = {{flex:1}}>
      <View style = {{ flex:0.85, backgroundColor: 'white' }}>
        <Card containerStyle = {{ height: '50%',marginTop: '35%', elevation: 10, margin: '5%', borderColor: 'grey', borderRadius: 5 }}>
          <TextInput placeholder = "Email" style={{ height: 50, borderColor: 'gray', borderWidth: 1, borderRadius:5 ,fontSize: 17 }}/>
          <TextInput placeholder = "Password" style={{ height: 50, borderColor: 'gray', borderWidth: 1, borderRadius:5,
                                                        fontSize: 17, marginTop: 20}}/>
          <Button title="Login" 
                    onPress = {navigation.navigate('Home')}
                    buttonStyle = {{ width: '80%', borderRadius: 50, height: '32%', marginTop: '20%', marginLeft: '10%', margin: '10%', marginBottom: '0%' }}/>
        </Card>
      </View>
      <View style = {{ flex:0.15, backgroundColor: 'white', alignItems: 'center' }}>
        <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>  
          <View style = {{ flex: 1}}>
            <Button title="Login" buttonStyle = {{ width: '30%', borderRadius: 360, height: '80%', marginLeft: '65%'}}/>
          </View> 
          <View style = {{ flex: 1 }}>
            <Button title="Sign Up" 
                    buttonStyle = {{ width: '30%', borderRadius: 360, height: '80%', marginLeft: '10%' }}
                    type="outline"/>
          </View>
        </View>
      </View>
    </View>
  </>)
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const { app } = state

  return {
    theme: app.theme,
    language: app.language
  };
};
export default connect(
    mapStateToProps,
    {
      setTheme,
      setLanguage,
      setUser
    },
  )(LoginForm);