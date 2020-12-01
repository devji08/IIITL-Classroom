import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import PostComponent from './PostComponent'
import CommentComponent from './CommentComponent'
import { Avatar, Button, Input, Icon } from 'react-native-elements';
import db from './firebase'

const mapStateToProps = (state) => {
    return {
        user : state.authentication.user,
        posts : state.feedReducer.posts
    }
};

class PostDetailComponent extends Component {
    state = {
        postid : this.props.route.params.postid,
        comment : null
    };

    render(){
        var addComment = () => {
            var post = this.props.posts.filter(post => post.id == this.state.postid)[0];
            var comments = post.comments;
            var obj = {};
            obj[this.props.user.email] = this.state.comment;
            comments.push(obj);
            db.collection("posts").doc(this.state.postid).set({comments:comments},{merge : true});
            this.setState({comment : ""});
        }; 
        var post = this.props.posts.filter(post => post.id == this.state.postid)[0];
        var comments = post.comments;
        // console.log(this.props.user);

        // console.log(this.state.comment);
        return(
            <View style = {styles.container}>
                <ScrollView>
                    <View>
                        <PostComponent post = {post} commentFunction = { ()=>{console.log('Nothing')}}/>
                    </View>
                        <Text style = {styles.comment}>COMMENTS</Text>
                    <View>
                        {comments.map(comment => <CommentComponent key = {comment[Object.keys(comment)[0]]} comment = {comment}/>)}
                    </View>
                </ScrollView>
                <View style  = {styles.bottom}>
                    <View style = {styles.bottom_avatar}>
                        <Avatar 
                            rounded 
                            title = {this.props.user == null? '':this.props.user.displayName[0]} 
                            size='small'
                            backgroundColor = 'grey'
                            source = {this.props.user==null?null:this.props.user.photoURL==null?null:{uri : this.props.user.photoURL}} />
                    </View>

                    <View style = {styles.bottom_input}>
                        <Input
                            value = {this.state.comment}
                            onChangeText = {(comment) => this.setState({comment : comment})}
                            inputContainerStyle={{borderColor:'white'}}
                            style={styles.input_text}
                            placeholder={"Write your Message"}
                            renderErrorMessage = {false}/>
                    </View>

                    <View style = {styles.bottom_button}>
                        <Button
                            type="clear"
                            icon={
                                <Icon
                                    type='material'
                                    name='send'
                                    color='grey'
                                    size={20}
                                />
                            }
                            onPress = {addComment}
                        />
                    </View>                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingBottom : 70
    },
    comment : {
        marginLeft : 10,
        marginBottom : 10,
        color : 'grey'
    },
    bottom : {
        flexDirection : 'row',
        marginBottom : 10,
        position : 'absolute',
        justifyContent : 'flex-end',
        bottom : 0,
        backgroundColor : '#fff',
        padding : 10
    },
    bottom_avatar : {
        flex : 1,
        justifyContent : 'center'
    },
    bottom_input : {
        flex : 8,
    },
    input_text : {
        borderRadius : 999,
        backgroundColor : '#eff2f5',
        paddingLeft : 10,
        fontSize : 15
    },
    bottom_button : {
        flex : 1,
        justifyContent : 'center'
    }
});

export default connect(mapStateToProps)(PostDetailComponent);