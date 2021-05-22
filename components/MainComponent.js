import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import UserProfile from './ProfileComponent.js';
import Subjects from './SubjectsComponent.js';
import Feed from './FeedComponent.js';
import Authentication from './AuthenticationComponent.js';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import PostDetailComponent  from './PostDetailComponent.js';
import QuizComponent from './QuizComponent';
import CheckAssignmentComponent from './CheckAssignmentComponent'
import AddAssignmentComponent from './AddAssignmentComponent'


const mapStateToProps = state => {
  return{
      user: state.authentication.user
  }
};

class Main extends Component {

  render() {

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
          <SubjectsNavigator.Screen
            name = 'PostDetail'
            component = {PostDetailComponent}
          />
          <SubjectsNavigator.Screen
            name = 'Quiz'
            component = {QuizComponent}
          />
          <SubjectsNavigator.Screen
            name = 'AddAssignment'
            component = {AddAssignmentComponent}
          />
          <SubjectsNavigator.Screen
            name = 'CheckAssignment'
            component = {CheckAssignmentComponent}
          />
        </SubjectsNavigator.Navigator>
      );
    }

    const MainNavigator = createDrawerNavigator();

    function MainNavigatorDrawer() {
        return(
            <MainNavigator.Navigator
              initialRouteName='Subjects'
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
            </MainNavigator.Navigator>
        );
    }

    if(this.props.user!=null){
      return (
        <NavigationContainer>
          <MainNavigatorDrawer/>
        </NavigationContainer>
      );
    }
    else{
      return <Authentication/>
    }
  }
}

export default connect(mapStateToProps)(Main);

const styles= StyleSheet.create({
  icon: {
    padding:100
  }
});