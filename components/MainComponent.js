import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Login from './LoginComponent.js';
import SignUp from './SignupComponent.js';
import UserProfile from './ProfileComponent.js';
import Subjects from './SubjectsComponent.js';
import Feed from './FeedComponent.js';
import Authentication from './AuthenticationComponent.js';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const LoginNavigator = createStackNavigator();

function LoginNavigatorScreen(){
  return(
    <LoginNavigator.Navigator
      initialRouteName = 'Authentication'
    >
      <LoginNavigator.Screen
        name = "Login"
        component = {Login}
        options = {{headerTitle: 'Log-In'}}
      />
      <LoginNavigator.Screen
        name = "Signup" 
        component = {SignUp}
        options = {{headerTitle: "Sign-up"}}
      />
      <LoginNavigator.Screen
        name = "Authentication" 
        component = {Authentication}
        options={
          ({navigation}) => ({
              headerLeft: () => (
                <Button
                type = 'clear'
                icon={
                  <Icon
                    name="menu"
                    size={30}
                    color="grey"
                  />
                }
                onPress={() => navigation.toggleDrawer()}
              />
              )
          
          })
       }
      />
    </LoginNavigator.Navigator>
  );
}

const ProfileNavigator = createStackNavigator();

function ProfileNavigatorScreen() {
  return(
    <ProfileNavigator.Navigator
      initialRouteName="Profile"
    >
      <ProfileNavigator.Screen
        name="Profile"
        component={UserProfile}
        options={
          ({navigation}) => ({
              headerLeft: () => (
                <Button
                type = 'clear'
                icon={
                  <Icon
                    name="menu"
                    size={30}
                    color="grey"
                  />
                }
                onPress={() => navigation.toggleDrawer()}
              />
              )
          })
       }
      />
    </ProfileNavigator.Navigator>
  );
}

const SubjectsNavigator = createStackNavigator();

function SubjectsNavigatorScreen() {
  return(
    <SubjectsNavigator.Navigator
      initialRouteName='Subjects'
    >
      <SubjectsNavigator.Screen
        name = 'Subjects'
        component = {Subjects}
        options = {
          ({navigation}) => ({
            headerLeft: () => (
              <Button
                type = 'clear'
                icon = {
                  <Icon
                    name = "menu"
                    size = {30}
                    color = 'grey'
                  />
                }
                onPress={()=> navigation.toggleDrawer()}
              />
            )
          })
        }
      />
      <SubjectsNavigator.Screen
        name = 'Feed'
        component = {Feed}
      />
    </SubjectsNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator
          initialRouteName='Authentication'
        >
          <MainNavigator.Screen
            name="Profile"
            component={ProfileNavigatorScreen}
            options={{
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='user'
                      type='font-awesome'
                      size={24}
                      color='grey'
                  />
              )
          }}
          />
          <MainNavigator.Screen
            name = 'Subjects'
            component = {SubjectsNavigatorScreen}
            options={{
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='book'
                      type='font-awesome'
                      size={24}
                      color='grey'
                  />
              )
          }}
          />
          <MainNavigator.Screen
            name="Authentication"
            component={LoginNavigatorScreen}
            options={{
              drawerIcon: ({tintColor}) => (
                  <Icon
                      name='sign-in'
                      type='font-awesome'
                      size={24}
                      color='grey'
                  />
              )
          }}
          />
        </MainNavigator.Navigator>
    );
}

export default function Main() {
  return (
    <NavigationContainer>
      <MainNavigatorDrawer/>
    </NavigationContainer>
  );
}

const styles= StyleSheet.create({
  icon: {
    padding:100
  }
});