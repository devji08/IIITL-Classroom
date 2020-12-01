import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon, Avatar } from 'react-native-elements';
import { signUpUser, signUpUserError } from '../redux/ActionCreators.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{
        isLoading : state.signUpReducer.isLoading,
        errorMsg : state.signUpReducer.errorMsg
    }
};

const mapDispatchToProps = dispatch => ({
    signUpUser : (email, password, userName, toggleLogin) => dispatch(signUpUser(email, password, userName, toggleLogin)),
    signUpUserError : (error) => dispatch(signUpUserError(error))
});

class SignUp extends Component {

    state={
        email: '',
        password: '',
        cpassword: '',
        username: ''
    };

    clearState() {
        this.setState({
            password:'',
            cpassword:'',
            username: '',
            email: ''
        })
    }
    
    handleSignup(userName, email, password, cpassword, toggleLogin) {
        if(password != cpassword){
            this.setState({
                password:'',
                cpassword:''
            });
            this.props.signUpUserError('Password missmatch !');
        }
        else if(email.substring(10,16)!='@iiitl'){
            this.setState({
                password:'',
                cpassword:'',
                email : '',
            });
            this.props.signUpUserError('Use you official E-mail !');
        }
        else{
            this.props.signUpUser(email, password, userName, toggleLogin);
        }
    }

    render() {
        const toggleLogin = this.props.toggleLogin;
        return(
            <View style = {styles.container}>
                 <View style={styles.avatar}>
                    <Avatar
                        size = 'xlarge'
                        source={require('./images/IIITL_logo.png')}
                    />
                </View>
                <Text style={styles.welcome}>WELCOME</Text>
                <Input
                    placeholder = "Full Name"
                    value = {this.state.username}
                    onChangeText = {(username) => {this.setState({username})}}
                    leftIcon = {
                        <Icon
                            type = "font-awesome"
                            name = "user"
                            size = {15}
                            color = 'grey'
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
                            color = 'grey'
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
                            color = 'grey'
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
                            color = 'grey'
                        />
                    }
                    errorMessage = {this.props.errorMsg}
                />
                <Text
                    style={styles.label}
                    onPress = {() => this.props.toggleLogin()}
                >
                    Login?
                </Text>
                <Button
                    buttonStyle = {styles.button}
                    title = "SIGNUP"
                    titleStyle={{fontWeight : 'bold'}}
                    loading = {this.props.isLoading}
                    onPress = {() => this.handleSignup(this.state.username, this.state.email, this.state.password, this.state.cpassword, toggleLogin)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 15
    },
    avatar : {
        alignSelf:'center'
    },
    welcome : {
        alignSelf : 'center',
        padding : 20,
        fontSize : 30,
        fontWeight : 'bold'
    },
    label: {
        color: 'grey',
        fontSize : 15,
        alignSelf : 'flex-end',
        paddingBottom : 10
    },
    button :{
        borderRadius: 999,
        marginBottom: 10,
        marginTop: 10,
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);