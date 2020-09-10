import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Text, Avatar, Accessory} from 'react-native-elements';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{
        user: state.user
    }

};

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    imageAdress() {
        if(this.props.user.photoURL!=null){
            console.log('enter');
            return {uri : this.props.user.photoURL};
        }
        else{
            console.log('null');
            return null;
        }
    }

    render() {
        const {navigate} = this.props.navigation;
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
                <View style={styles.container}>
                    <Button 
                        title = "Login"
                        onPress = {() => navigate('Authentication')}
                    />
                </View>
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