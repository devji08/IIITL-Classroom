import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Image} from 'react-native-elements';
import { connect } from 'react-redux';
import { signOutUser } from '../redux/ActionCreators.js';

const mapStateToProps = state => {
    return{
        user: state.user
    }
};

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutUser())
});

class Authentication extends Component {

    constructor(props) {
        super(props);
    }

    Buttons(props) {
        var user = props.user;
        const navigate = props.navigation
        if(user!=null){
            return(
                <Button
                    buttonStyle = {{margin:5}}
                    title = "Sign out"
                    onPress = {() => {props.signOutUser()}}
                />
            );
        }
        else{
            return(
                <View>
                    <Button
                        buttonStyle = {{margin:5}}
                        title = "Login"
                        onPress = {() => navigate('Login')}
                    />
                    <Button
                        buttonStyle = {{margin:5, backgroundColor:'#32ad32'}}
                        title = "Signup"
                        onPress = {() => navigate('Signup')}
                    />
                </View>
            );
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        const signOutUser = this.props.signOutUser;
        return(
            <View style={styles.container}>
                <View style={styles.div}>
                    <Image
                        source = {require('./images/IIITL_logo.png')}
                        style = {{width:250 , height:220}}
                    />
                </View>
                <View>
                    <Text style={{fontSize:24, fontWeight:'bold', marginBottom:10, padding:10}}>Welcome to Discussion Forum</Text>
                    <Text style={{padding:10, marginBottom:10}}>This Forum is only for the academics purposes, Kindly do not spam it with inappropriate content and maintain its integrity. To continue using the forum Kindy login to your account.</Text>
                </View>
                <this.Buttons navigation={navigate} signOutUser={signOutUser} user={this.props.user}/>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

const styles=StyleSheet.create({
    container : {
        flex:1,
    },
    div : {
        margin:20,
        alignItems:'center',
    }
});