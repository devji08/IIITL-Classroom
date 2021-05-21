import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class Subject extends Component {

    image(id){
        switch(id){
            case 0 :
                return require('./images/0.jpg');
            case 1 :
                return require('./images/1.jpg');
            case 2 :
                return require('./images/2.jpg');
            case 3 :
                return require('./images/3.jpg');
            case 4 :
                return require('./images/4.jpg');
            default :
                return require('./images/3.jpg');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    activeOpacity = {0.9}
                    onPress = {()=>{this.props.navigate('Feed',{subCode : this.props.subCode, subName : this.props.subName, subLink : this.props.subLink})}}    
                >
                    <View style={styles.top}>
                        <Text >{this.props.subName}</Text>
                        <Text>{'B.Tech ('}{this.props.sem}{')'}</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Image 
                            style={styles.image} 
                            source={this.image(this.props.id)}
                        />                                                                          
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        marginTop : 15,
        borderRadius : 15,
        elevation : 3,
    },

    top : {
        padding : 10,
        borderBottomWidth : 1,
        borderColor : 'lightgrey'
    },
    bottom : {
        height : 200,
    },
    image : {
        flex: 1,
        width : "100%",
        justifyContent: "center",
        borderBottomRightRadius : 15,
        borderBottomLeftRadius : 15,
    }
});


export default Subject;
