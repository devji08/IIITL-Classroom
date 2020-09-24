import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet} from 'react-native'
import AddpostComponent from './AddPostComponent.js';
import { ScrollView } from 'react-native-gesture-handler';
import PostComponent from './PostComponent.js';
import { Loading } from './loadingComponent.js';

const mapStateToProps = (state) => ({
    posts : state.feedReducer.posts,
    isLoading : state.feedReducer.isLoading,
})

export class Feed extends Component {

    state = {
        subName : this.props.route.params.subName,
        subCode : this.props.route.params.subCode
    };

    render() {
        const navigation = this.props.navigation;
        navigation.setOptions({title : this.state.subName});
        if(this.props.isLoading){
            return (
                <View style={styles.container}>
                    <AddpostComponent subCode={this.state.subCode}/>
                    <Loading/>
                </View>
            );
        }
        else{
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
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ccc'
    }
})


export default connect(mapStateToProps)(Feed)
