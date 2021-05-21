import React, {Component} from 'react'
import {View, StyleSheet, Text, Linking} from 'react-native'
import {Icon} from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler'

class AssignmentComponent extends Component {


    render() {
        var d = new Date(this.props.ass.postdate.seconds * 1000);
        var postdate = (d.toDateString().substring(4,10));
        var duedate = (new Date(this.props.ass.due.seconds * 1000)).toDateString().substring(4,10);
        return(
            <TouchableOpacity 
                            activeOpacity = {0.5}
                            onPress = {() => { this.props.navigate('Quiz',{data : this.props.ass})}}
                            style = {styles.container}
                        >
                <View >
                    <View style = {styles.top}>
                        <Text style = {{fontWeight:'bold', fontSize : 18, paddingBottom : 5, color : '#5b0a91'}}>{this.props.ass.title}</Text>
                        <Text style = {{color:'gray', paddingBottom : 5}}>{this.props.ass.professor} - {postdate}</Text>
                        <View style={{flexDirection : 'row'}}>
                            <Text style = {{paddingBottom : 10}}>{this.props.ass.points} points</Text>
                            <Text style = {{textAlign : 'right', flex : 1}}>Due {duedate}</Text>
                        </View>
                    </View>
                    <View style = {styles.bottom}>
                        <Text>{this.props.ass.description}</Text>
                        
                        
                            <View style={{flexDirection : 'row'}}>
                                {<View style= {{flex : 1, paddingTop : 10}}>
                                    <Icon
                                        type = 'font-awesome-5'
                                        name = 'file-pdf'
                                        size = {50}
                                        color = '#a62c2b'
                                        containerStyle = {{alignItems : 'flex-start'}}
                                    />
                                </View>}
                                <Text style={{flex:6, alignSelf : 'center', color : 'gray'}}>{this.props.ass.title}.pdf</Text>
                            </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
      
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        borderTopRightRadius : 15,
        borderTopLeftRadius : 15,
        elevation : 3,
        padding : 5,
        marginTop : 10
    },
    top : {
        borderBottomWidth : 1,
        borderColor : '#5b0a91',
    },
    bottom : {
        height : 100,
        paddingTop : 5
    },
})

export default AssignmentComponent;