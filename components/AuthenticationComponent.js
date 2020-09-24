import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import Login from './LoginComponent.js'
import SignUp from './SignupComponent.js'

class Authentication extends Component {

    state = {
        login : true,
    };

    render() {

        const toggleLogin = () => {
            this.setState({login : !this.state.login})
        }
        return (
            <View style={styles.container}>
                {
                    this.state.login?<Login toggleLogin={toggleLogin}/>:<SignUp toggleLogin={toggleLogin}/>
                }
            </View>
        );
    }
}
export default Authentication;

const styles=StyleSheet.create({
    container : {
        flex:1,
        justifyContent : 'center'
    },
});