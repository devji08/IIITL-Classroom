import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import * as firebase from 'firebase';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            cpassword: '',
            username: '',
            isLoading: false
        }
    }

    clearState() {
        this.setState({
            password:'',
            cpassword:'',
            username: '',
            email: ''
        })
    }
    async fsignup(username, email ,password) {
        const {goBack} = this.props.navigation;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (user){
                user.user.updateProfile({
                    displayName: username
                })
                .catch(function(error) {
                    ToastAndroid.show(error.message,ToastAndroid.LONG);
                });
                user.user.sendEmailVerification()
                    .then(function () {
                        ToastAndroid.show("Please check your Email and Log-in again",ToastAndroid.LONG);
                        goBack();
                    })
                    .catch(function(error) {
                        ToastAndroid.show(error.message,ToastAndroid.LONG);
                    });
            })
            .catch(function(error) { ToastAndroid.show(error.message,ToastAndroid.LONG)});
    }
    
    handleSignup(username, email, password, cpassword) {
        if(password == cpassword){
            this.setState({isLoading: true});
            this.fsignup(username, email, password);
        }
        else{
            this.setState({
                password:'',
                cpassword:''
            })
            ToastAndroid.show("Password mismatch",ToastAndroid.LONG);
        }
    }

    render() {
        return(
            <View style = {styles.container}>
                <Input
                    placeholder = "Full Name"
                    value = {this.state.username}
                    onChangeText = {(username) => {this.setState({username})}}
                    leftIcon = {
                        <Icon
                            type = "font-awesome"
                            name = "user"
                            size = {15}
                        />
                    }
                />
                 <Input
                    placeholder = "E-mail"
                    value = {this.state.email}
                    onChangeText = {(email) => {this.setState({email})}}
                    leftIcon = {
                        <Icon
                            type = "font-awesome"
                            name = "user"
                            size = {15}
                        />
                    }
                />
                <Input
                    placeholder="Password"
                    value = {this.state.password}
                    onChangeText = {(password) => {this.setState({password})}}
                    secureTextEntry={true}
                    leftIcon = {
                        <Icon
                            type = "font-awesome"
                            name = "lock"
                            size = {15}
                        />
                    }    
                />
                <Input
                    placeholder="Confirm Password"
                    value = {this.state.cpassword}
                    onChangeText = {(cpassword) => {this.setState({cpassword})}}
                    secureTextEntry={true}
                    leftIcon = {
                        <Icon
                            type = "font-awesome"
                            name = "lock"
                            size = {15}
                        />
                    }    
                />
                <Button
                    buttonStyle = {{margin:5, borderRadius:10}}
                    title = "Signup"
                    loading = {this.state.isLoading}
                    onPress = {() => this.handleSignup(this.state.username, this.state.email, this.state.password, this.state.cpassword)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:100
    },
});
export default Signup;