import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { loginUser } from '../redux/ActionCreators.js';

const mapStateToProps = state => {
    return{
        isLoading : state.authentication.isLoading,
        errormsg : state.authentication.errorMsg
    }
};

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
});

class Login extends Component {

    state = {
        email: '',
        password: ''
    };
   
    render() {
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
                    placeholder = "Username"
                    value = {this.state.email}
                    onChangeText = {(email) => {this.setState({email})}}
                    leftIcon = {
                        <Icon
                            type = "font-awesome"
                            name = "user"
                            size = {15}
                            color ='grey'
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
                            color ='grey'
                        />
                    }
                    errorMessage = {this.props.errormsg}
                />
                <Text 
                    style={styles.label}
                    onPress = {() => this.props.toggleLogin()}    
                >
                    Signup?
                </Text>
                <Button
                    buttonStyle = {styles.button}
                    title = "LOGIN"
                    titleStyle = {{fontWeight : 'bold'}}
                    loading = {this.props.isLoading}
                    onPress = {() => {
                        this.props.loginUser(this.state.email, this.state.password);
                    }}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'center'
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
    errorLabel: {
        color: 'red',
        marginRight: 10,
        marginLeft: 10,
    },
    button :{
        borderRadius: 999,
        marginBottom: 10,
        marginTop: 10,
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);