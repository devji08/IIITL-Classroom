import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Icon, Text } from 'react-native-elements';
import { signUpUser, signUpUserError } from '../redux/ActionCreators.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{
        isLoading : state.signUpReducer.isLoading,
        errorMsg : state.signUpReducer.errorMsg
    }
};

const mapDispatchToProps = dispatch => ({
    signUpUser : (email, password, userName, goBack) => dispatch(signUpUser(email, password, userName, goBack)),
    signUpUserError : (error) => dispatch(signUpUserError(error))
});

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            cpassword: '',
            username: ''
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
    
    handleSignup(userName, email, password, cpassword, goBack) {
        if(password != cpassword){
            this.setState({
                password:'',
                cpassword:''
            });
            this.props.signUpUserError('Password missmatch !');
        }
        else if(email.substring(9,15)!='@iiitl'){
            this.setState({
                password:'',
                cpassword:'',
                email : '',
                userName : ''
            });
            this.props.signUpUserError('Use you official E-mail !');
        }
        else{
            this.props.signUpUser(email, password, userName, goBack);
        }
    }

    render() {
        const { goBack } = this.props.navigation;
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
                <Text style={styles.errorLabel}>
                    {this.props.errorMsg}
                </Text>
                <Button
                    buttonStyle = {styles.button}
                    title = "Signup"
                    loading = {this.props.isLoading}
                    onPress = {() => this.handleSignup(this.state.username, this.state.email, this.state.password, this.state.cpassword, goBack)}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);