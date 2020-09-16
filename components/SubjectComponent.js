import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    
}

export class Subject extends Component {

    constructor(props){
        super(props);
    }

    render() {
        console.log(this.props.subName);
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress = {()=>{this.props.navigate('Feed',{subCode : this.props.subCode})}}    
                >
                    <View style={styles.top}>
                        <Text>{this.props.subName}</Text>
                        <Text>{'B.Tech ('}{this.props.sem}{')'}</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Image 
                            style={styles.image} 
                            source={require('./images/book.jpg')}
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


export default connect(mapStateToProps, mapDispatchToProps)(Subject)
