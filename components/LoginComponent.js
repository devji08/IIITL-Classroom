import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { loginUser } from '../redux/ActionCreators.js';

const mapStateToProps = state => {
    return{
        user : state.authentication.user,
        isLoading : state.authentication.isLoading,
        errormsg : state.authentication.errorMsg
    }
};

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password, navigate) => dispatch(loginUser(email, password, navigate)),
});

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        }
    }
   
    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style = {styles.container}>
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
                <Text style={styles.errorLabel}>
                    {this.props.errormsg}
                </Text>
                <Button
                    buttonStyle = {styles.button}
                    title = "Login"
                    loading = {this.props.isLoading}
                    onPress = {() => {
                        this.props.loginUser(this.state.email, this.state.password, navigate);
                    }}
                />
                <Text style={styles.label}>
                    Don't have a account ?
                </Text>
                <Button
                    buttonStyle = {{marginTop:10, marginBottom:10, borderRadius:10, backgroundColor:'#32ad32'}}
                    title = "Signup"
                    onPress = {() => navigate('Signup')}
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
    label: {
        marginLeft: 10,
        color: 'red'
    },
    errorLabel: {
        color: 'red',
        marginRight: 10,
        marginLeft: 10,
    },
    button :{
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);