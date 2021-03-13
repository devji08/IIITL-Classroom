import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Avatar} from 'react-native-elements'
import db from './firebase'

class CommentComponent extends Component {

    state = {
        userid : Object.keys(this.props.comment)[0],
        user : null,
        error : null
    };

    componentDidMount() {

        db.collection("users").doc(this.state.userid)
        .onSnapshot(doc => {
            this.setState({
                user : doc.data()
            });
        }, error => {
            this.setState({error : error});
        });
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <View style = {{borderTopWidth:0.5, borderColor : 'grey', width : 150, alignSelf : 'center'}}></View> */}
                <View style={styles.top}>
                    <Avatar
                        rounded
                        title={this.state.user==null?'':this.state.user.displayName[0]}
                        backgroundColor='grey'
                        size={20}
                        source={this.state.user==null?null:this.state.user.photoURL==null?null:{uri : this.state.user.photoURL}}
                    />
                    <View style={styles.top_option}>
                        <Text style={styles.userName}>{this.state.user==null?'...':this.state.user.displayName}</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <Text style={styles.title}>{this.props.comment[this.state.userid]}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        display:'flex',
        backgroundColor: 'white',
    },
    top : {
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        marginLeft : 10,
        marginTop : 5,
    },
    top_option : {
        marginLeft : 5,
    },
    userName : {
        fontWeight : 'bold',
        fontSize : 12
    },
    middle : {
        marginTop : 5,
        marginBottom : 5
    },
    title : {
        marginLeft : 10,
    },

});

export default CommentComponent;