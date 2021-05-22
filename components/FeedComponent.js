import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Linking} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddpostComponent from './AddPostComponent.js';
import PostComponent from './PostComponent.js';
import ClassroomComponent from './ClassroomComponent.js';
import { Loading } from './loadingComponent.js';

const mapStateToProps = (state) => ({
    posts : state.feedReducer.posts,
    isLoading : state.feedReducer.isLoading,
})

export class Feed extends Component {

    state = {
        subName : this.props.route.params.subName,
        subCode : this.props.route.params.subCode,
        subLink : this.props.route.params.subLink
    };

    render() {
        const {navigate} = this.props.navigation;
        const navigation = this.props.navigation;
        navigation.setOptions({title : this.state.subName});
        navigation.setOptions({
            headerRight: () => (
                <Button
                  type = 'clear'
                  icon = {
                    <Icon
                      type = 'font-awesome'
                      name = 'video-camera'
                      size = {20}
                      color = 'grey'
                      style = {{marginHorizontal:10}}
                    />
                  }
                  onPress = {() => Linking.openURL(this.state.subLink)}
                />
              )
        });
        var Classroom = () =>{
            return(
                <ClassroomComponent subCode = {this.state.subCode} subName = {this.state.subName} navigate = {navigate}/>
            )
        }
        var Forum = () => {
            const navigation = this.props.navigation;
            if(this.props.isLoading){
                return (
                    <View style={styles.container}>
                        <AddpostComponent subCode={this.state.subCode}/>
                        <Loading/>
                    </View>
                );
            }
            else{
                var posts = [];
                for( var i=0; i<this.props.posts.length ; i++){
                    if(this.props.posts[i].subCode == this.state.subCode){
                        posts.push(this.props.posts[i]);
                    }
                }
                return (
                    <ScrollView>
                        <View style={styles.container}>
                            <AddpostComponent subCode={this.state.subCode}/>
                            {
                                posts.map(post => (<PostComponent key={post.id} post={post} commentFunction = {() => navigation.navigate('PostDetail', {postid : post.id})}/>))
                            }
                        </View>
                    </ScrollView>
                )
            }
        }
        
        const Tab = createBottomTabNavigator();

        return(
                <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Forum') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                      } else if (route.name === 'Classroom') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                      }
          
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                  }}
                >
                    <Tab.Screen name="Forum" component={Forum} />
                    <Tab.Screen name="Classroom" component={Classroom} />
                </Tab.Navigator>
        );
        
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ccc'
    }
})


export default connect(mapStateToProps)(Feed)
