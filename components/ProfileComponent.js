import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Text, Avatar, Accessory} from 'react-native-elements';
import { connect } from 'react-redux';
import DefaultComponent from './DefaultComponent.js';
import { uploadUserPhoto } from '../redux/ActionCreators.js';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { fetchPost } from '../redux/ActionCreators';
import PostComponent from './PostComponent.js';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return{
        user: state.authentication.user,
        isLoading : state.profileReducer.isLoading,
        posts : state.feedReducer.posts,
    }

};

const mapDispatchToProps = dispatch => ({
    uploadUserPhoto : (image, email) => dispatch(uploadUserPhoto(image, email)),
    fetchPost : () => dispatch(fetchPost()),    
});


class UserProfile extends Component {

    image = () => {
        if(this.props.isLoading)return require('./images/loading.gif');
        else{
            if(this.props.user.photoURL==null) return null;
            else return {uri : this.props.user.photoURL};
        }
    };

    render() {
        const {navigate} = this.props.navigation;
        if(this.props.user != null){
            if(this.props.posts.length == 0) this.props.fetchPost();
            var posts = [];
            for( var i=0; i<this.props.posts.length ; i++){
                if(this.props.posts[i].user == this.props.user.email){
                    posts.push(this.props.posts[i]);
                }
            }
            return(
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.avatar}>
                            <Avatar
                                rounded
                                size = 'xlarge'
                                title = {this.props.user.displayName[0]}
                                backgroundColor='#999'
                                source={this.image()}
                            >
                                <Accessory
                                    size={40}
                                    onPress={() => {this._pickImage()}}
                                />
                            </Avatar>
                            <Text style={styles.userName}>{this.props.user.displayName}</Text>
                        </View>
                        <View style = {styles.posts}>
                            {
                                posts.map(post => (<PostComponent key={post.id} post={post}/>))
                            }
                        </View>                    
                    </View>
                </ScrollView>
            );
        }
        else{
            return(
               <DefaultComponent navigate={navigate}/>
            );
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };
    
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            });
            if (!result.cancelled) {
                this.props.uploadUserPhoto(result.uri, this.props.user.email);
            }
        } catch (E) {
            console.log(E);
        }
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatar: {
        alignItems:'center',
        borderBottomWidth : 1,
        borderColor : '#eff2f5'
    },
    userName:{
        fontWeight : 'bold',
        fontSize : 30,
        margin : 10
    },
    posts : {
        backgroundColor : '#bbb'
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);