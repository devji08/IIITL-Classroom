import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Text, Avatar, Accessory} from 'react-native-elements';
import { connect } from 'react-redux';
import DefaultComponent from './DefaultComponent.js';

const mapStateToProps = state => {
    return{
        user: state.authentication.user
    }

};

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    imageAdress() {
        if(this.props.user.photoURL!=null){
            return {uri : this.props.user.photoURL};
        }
        else{
            return null;
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log(this.props.user);
        if(this.props.user != null){
            return(
                <View style={styles.container}>
                    <View style={styles.avatar}>
                        <Avatar
                            rounded
                            size = 'xlarge'
                            title = {this.props.user.displayName[0]}
                            backgroundColor='#999'
                            source={this.imageAdress()}
                        >
                            <Accessory
                                size={40}
                                onPress={() => {console.log('worked')}}
                            />
                        </Avatar>
                        <Text style={styles.userName}>{this.props.user.displayName}</Text>
                    </View>
                </View>
            );
        }
        else{
            return(
               <DefaultComponent navigate={navigate}/>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    avatar: {
        alignItems:'center'
    },
    userName:{
        fontWeight : 'bold',
        fontSize : 30,
        margin : 10
    }
});
export default connect(mapStateToProps)(UserProfile);