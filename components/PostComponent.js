import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Image, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { fetchPostUser } from '../redux/ActionCreators.js'

const mapStateToProps = (state) => ({
    user : state.postDetailReducer.user,
    isLoading : state.postDetailReducer.isLoading,
    errorMsg : state.postDetailReducer.errorMsg,
})

const mapDispatchToProps = dispatch => ({
    fetchPostUser : (email) => dispatch(fetchPostUser(email)),
});

export class PostComponent extends Component {
    state = {
        like : false,
    }
    render() {
        if(this.props.user == null) this.props.fetchPostUser(this.props.post.user);
        var date = this.props.post.date.toDate().toString().substring(4,15);
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Avatar
                        rounded
                        title={this.props.isLoading?'':this.props.user.userName[0]}
                        backgroundColor='grey'
                        size='small'
                    />
                    <View style={styles.top_option}>
                        <Text style={styles.userName}>{this.props.isLoading?'...':this.props.user.userName}</Text>
                        <Text style = {styles.timestamp}>{date}</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <Text style={styles.title}>{this.props.post.title}</Text>
                    <Image
                        source={{uri : this.props.post.image}}
                        style = {this.props.post.image!=null?styles.image:styles.noImage}
                    />
                </View>
                <View style={styles.bottom}>
                    <View style={styles.options}>
                        <Button 
                            type="clear"
                            icon={
                                <Icon
                                    type='font-awesome'
                                    name={this.state.like?'thumbs-up':'thumbs-o-up'}
                                    color={this.state.like?'#4a88d4':'grey'}
                                />
                            }
                            onPress = { () => {this.setState({like : !this.state.like})}}
                        /> 
                    </View>
                    <View style={styles.options}>
                        <Button 
                            type="clear"
                            icon={
                                <Icon
                                    type='font-awesome-5'
                                    name='comment-alt'
                                    color='grey'
                                    size={20}
                                />
                            }
                        /> 
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        display:'flex',
        backgroundColor: 'white',
        marginTop : 15,
    },
    top : {
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        marginLeft : 10,
        marginTop : 10,
    },
    top_option : {
        marginLeft : 10,
    },
    userName : {
        fontWeight : 'bold',
    },
    timestamp : {
        color : 'grey',
    },
    middle : {
        marginTop : 10,
        marginBottom : 10
    },
    title : {
        marginLeft : 10,
        marginBottom : 10,
    },
    image : {
        flex : 1,
        height : 400,
    },
    noImage : {
        borderBottomWidth : 1,
        borderColor : '#eff2f5',
    },
    bottom : {
        display: 'flex',
        flexDirection : 'row',
        paddingBottom : 5
    },
    options : {
        flex : 1,
        borderLeftWidth:1,
        borderLeftColor : '#bbb'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent)