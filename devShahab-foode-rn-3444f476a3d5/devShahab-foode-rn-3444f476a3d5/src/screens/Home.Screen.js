import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';
import { setUser } from "../store/actions/userSession";
import * as AuthServices from '../services'
import preferences from '../common/preferences';
import { translate } from '../language';
import { setTheme, setLanguage } from "../store/actions/app";
import { Button, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
const HomeScreen = (props) => {
  const { navigation, theme, language, setLanguage} = props;

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "",
      margin: 30
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "",
      margin: 30
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "",
      margin: 50
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "",
        margin: 50
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "",
        margin: 50
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "",
        margin: 50
    },

  ];
  
  const Item = ({ item, onPress, style }) => (
    <View>
      <TouchableOpacity onPress={onPress} 
        style={{
          borderWidth:1,
          borderColor:'rgba(0,0,0,0.2)',
          alignItems:'center',
          justifyContent:'center',
          width:60,
          height:60,
          backgroundColor:'#fff',
          borderRadius:50,
          marginLeft: 30,
          marginLeft: 30,
          marginTop: 30,}}>
       <Image style={{
          width:90,
          height:90,
          borderRadius:50
       }} resizeMode='cover' source={require('../assets/images/pexels-lisa-fotios-1279330.jpg')}></Image>
      </TouchableOpacity>

    </View>
    );

    const Restaurants = ({ item, onPress, style }) => (
      <View>
        <ImageBackground 
              source = {require('../assets/images/pexels-lisa-fotios-1279330.jpg')}
              style = {{ width: 150, height: 150, marginLeft: 10 }}
              >
              <View style = {{ flex: 1, flexDirection: 'row' }}>  
                <View style = {{ flex: 1, marginTop: 110, marginLeft: 90 }}>
                  <Icon
                    raised
                    name='heart'
                    type='font-awesome'
                    color='#f50'
                    size = {10}
                    style = {{ }}
                    onPress={() => console.log('hello')} />
                </View> 
                <View style = {{ flex: 1, marginTop: 110, marginRight: 5 }}>
                  <Icon
                    raised
                    name='bookmark'
                    type='font-awesome'
                    color = '#f10'
                    size = {10}
                    style = {{  }}
                    onPress={() => console.log('hello')} />
                </View> 
              </View>

        </ImageBackground>  
        <Text style = {{ fontWeight:'bold', marginLeft: 10, marginTop: 5 }}>Fine Dining</Text>
        <Text style = {{ color: "#1E5CA0",marginLeft: 10 }}>$$ - Asian</Text>
        <TouchableOpacity onPress={onPress} 
          style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:20,
            height:20,
            backgroundColor:'#fff',
            borderRadius:50,
            marginLeft: 10,
            marginTop: 5,}}>
          <View style = {{ flex: 1, flexDirection: 'row' }}>
            <Image style={{
                width:25,
                height:25,
                borderRadius:50,
                marginLeft:10
            }} resizeMode='cover' source={require('../assets/images/pexels-lisa-fotios-1279330.jpg')}></Image>
            <Text>+30</Text>
          </View>
        </TouchableOpacity>
      </View>
      );

  const renderItem = ({ item }) => {
    return (
      <View>
      <Item
        item={item}
        />
      <Text style = {{ marginLeft: 25, marginTop: 20, marginRight: 20 }}>Fine Dining</Text>
      </View>
    );
  };

  const renderRestaurants = ({ item }) => {
    return (
      <Restaurants
        item={item}
        />
    );
  };

  return(
  <View style = {{ flex:1, backgroundColor: 'white' }}>
    <View style = {{ flex: 0.32, 
        //backgroundImage: 'linear-gradient(to bottom, orange, orange 50%, green 50%, green)',
       backgroundColor: 'rgba(32, 92, 160, 1)'
    }}>
        <Input
            placeholder='Restaurants and cuisines'
            color = {'white'}
            leftIcon={{ type: 'font-awesome', name: 'search' }}
            style = {{ fontSize: 15, color: 'white' }}
            inputContainerStyle = {{ color: 'white' }}
        />
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal 
        />
    </View>
    <View style = {{ flex: 0.22, borderBottomWidth: 1
    }}>
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal 
        />
    </View>
    <View style = {{ flex: 0.07, flexDirection: 'row' }}>  
      <View style = {{ flex: 1 }}>
         <Text style = {{ fontWeight: 'bold', fontSize: 20,marginLeft: 10, marginTop: 10 }}>Favourites</Text>
      </View> 
      <View style = {{ flex: 1, fontColor: 'rgba(32, 92, 160, 1)' }}>
        <Text style = {{ color: "#1E5CA0",marginLeft: 140, marginTop: 15 }}>View All</Text>
      </View> 
     </View>
     <View style = {{ flex: 0.35 }}>
      <FlatList
          data={DATA}
          renderItem={renderRestaurants}
          keyExtractor={(item) => item.id}
          horizontal 
        />
     </View>
  </View>)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginTop: 16,
        width: 350,
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
  });
  

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
  )(HomeScreen);