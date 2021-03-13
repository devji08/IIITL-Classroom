import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Image, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import db from './firebase.js'

const mapStateToProps = (state) => {
    return {
        uname : state.authentication.user.email,
        posts : state.feedReducer.posts
    }
};

class PostComponent extends Component {
    
    state = {
        user : null,
        date : '...',
        error : null
    }

    componentDidMount() {

        var d = new Date(this.props.post.date.seconds * 1000);
        var date = (d.toDateString().substring(0,10));

        db.collection("users").doc(this.props.post.user)
        .onSnapshot(doc => {
            this.setState({
                user : doc.data(),
                date : date
            });
        }, error => {
            this.setState({error : error});

        });
    }

    render() {
        var post = this.props.posts.filter(post => post.id == this.props.post.id)[0];
        var like = post.likes.filter(user => this.props.uname == user).length;
        const likePost = () => {
            var likes = post.likes;
            if(like == 0) likes.push(this.props.uname);
            else{
                for( var i = 0; i < likes.length; i++){                   
                    if ( likes[i] === this.props.uname) { 
                        likes.splice(i, 1); 
                        i--; 
                    }
                }
            }
            db.collection("posts").doc(this.props.post.id).set({likes:likes},{merge : true});
        };

        return (            
            <View style={styles.container}>
                <View style={styles.top}>
                    <Avatar
                        rounded
                        title={this.state.user==null?'':this.state.user.displayName[0]}
                        backgroundColor='grey'
                        size='small'
                        source={this.state.user==null?null:this.state.user.photoURL==null?null:{uri : this.state.user.photoURL}}
                    />
                    <View style={styles.top_option}>
                        <Text style={styles.userName}>{this.state.user==null?'...':this.state.user.displayName}</Text>
                        <Text style = {styles.timestamp}>{this.state.date}</Text>
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
                                    name={like == 1?'thumbs-up':'thumbs-o-up'}
                                    color={like == 1?'#4a88d4':'grey'}
                                />
                            }
                            onPress = {likePost}
                            title = {this.props.post.likes.length}
                            titleStyle = {{color : 'grey', paddingLeft : 10}}
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
                            onPress = { this.props.commentFunction }
                            title = "Comment"
                            titleStyle = {{color : 'grey', paddingLeft : 10, fontSize : 14}}
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
        marginBottom : 15,
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

export default connect(mapStateToProps)(PostComponent);