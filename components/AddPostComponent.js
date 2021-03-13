import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet} from 'react-native'
import { Avatar, Icon, Input, Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { addPost } from '../redux/ActionCreators.js'

const mapStateToProps = (state) => ({
    user : state.authentication.user,
    isLoading : state.postReducer.isLoading,
})

const mapDispatchToProps = dispatch => ({
    addPost : (email, title, image, subCode) => dispatch(addPost(email, title, image, subCode)),
});

export class AddPostComponent extends Component {
    state={
        image : null,
        title: null,
    };

    render() {
        return (
            <View style={styles.addPost}>
                <View style={styles.addPostTop}>
                    <Avatar
                        rounded
                        size={40}
                        title={this.props.user.displayName[0]}
                        backgroundColor='grey'
                        source={this.props.user.photoURL==null?null:{uri : this.props.user.photoURL}}
                        />
                    <Input
                        value={this.state.title}
                        onChangeText={(title)=>{this.setState({title})}}
                        inputContainerStyle={{borderColor:'white'}}
                        style={styles.addPostInput}
                        placeholder={"What's on your mind ?"}
                    />
                </View>
                <View style={styles.addPostBotttom}>
                    <View style={styles.addPostOption}>
                        <Button 
                            type="clear"
                            titleStyle={{color:'black'}}
                            icon={
                                <Icon
                                    name={this.state.image==null?'image':'check'}
                                    color='green'
                                />
                            }
                            title = " Photos"
                            onPress = { () => this._pickImage()}
                        />
                    </View>
                    <View style={styles.addPostOption}>
                        <Button
                            loading = {this.props.isLoading}
                            type="clear"
                            title = " Submit Doubt"
                            titleStyle={{color:'black'}}
                            icon = {
                                <Icon
                                    name='send'
                                    color='#2361ad'
                                />
                            }
                            onPress = {() => {
                                    if(this.state.title != null)this.props.addPost(this.props.user.email, this.state.title, this.state.image, this.props.subCode);
                                    this.setState({title:null, image:null});
                                }
                            }
                        />
                    </View>
                </View>
            </View>
        )
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
            this.setState({ image: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    };

}

const styles = StyleSheet.create({
    addPost:{
        display : 'flex',
        flexDirection: 'column',
        backgroundColor:'white',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderColor : '#eff2f5',
    },
    addPostTop: {
        display: 'flex',
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderColor : '#eff2f5',
        paddingLeft : 35,
        paddingRight : 25,
        paddingTop : 15
    },
    addPostInput : {
        borderRadius : 999,
        backgroundColor : '#eff2f5',
        paddingLeft : 15
    },
    addPostBotttom : {
        display : 'flex',
        flexDirection : 'row',
        paddingBottom : 15,
        paddingTop : 15
    },
    addPostOption : {
        flex:1,
        borderLeftWidth:1,
        borderLeftColor : '#bbb'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPostComponent)