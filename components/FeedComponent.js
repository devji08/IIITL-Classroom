import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import AddpostComponent from './AddPostComponent.js';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchPost } from '../redux/ActionCreators';
import PostComponent from './PostComponent.js';

const mapStateToProps = (state) => ({
    posts : state.feedReducer.posts,
    isLoading : state.feedReducer.isLoading,
})

const mapDispatchToProps = dispatch => ({
    fetchPost : () => dispatch(fetchPost()),    
});

export class Feed extends Component {

    constructor(props){
        super(props);
        this.state={
            subName : this.props.route.params.subName,
            subCode : this.props.route.params.subCode
        };
    }
    render() {
        const navigation = this.props.navigation;
        navigation.setOptions({title : this.state.subName});
        if(this.props.posts.length == 0) this.props.fetchPost();
        var posts = [];
        for( var i=0; i<this.props.posts.length ; i++){
            if(this.props.posts[i].subCode == this.state.subCode){
                posts.push(this.props.posts[i]);
            }
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <AddpostComponent subCode={this.state.subCode}/>
                    {
                        posts.map(post => (<PostComponent key={post.id} post={post}/>))
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ccc'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Feed)
