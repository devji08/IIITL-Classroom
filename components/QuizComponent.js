import React, { Component } from 'react'
import {View, StyleSheet, Text, Linking} from 'react-native'
import {Icon} from 'react-native-elements'

class QuizComponent extends Component {

    state = {
        data : this.props.route.params.data,
    };

    render() {
        const navigation = this.props.navigation;
        navigation.setOptions({title : this.state.data.subname});

        var d = new Date(this.state.data.postdate.seconds * 1000);
        var postdate = (d.toDateString().substring(0,10));
        d = new Date(this.state.data.due.seconds * 1000);
        var duedate = (d.toDateString().substring(0,10));
        console.log(this.state.data, postdate, duedate);

        return (
            <View style = {styles.container}>
                <View>
                    <View style = {{
                        borderBottomWidth : 1,
                        borderBottomColor : '#4285f4',
                        marginBottom : 10,
                    }}>
                        <View>                        
                            <Text
                                style = {{
                                    fontSize : 30,
                                    color : '#1967d2',
                                    fontFamily : 'Roboto',
                                    fontWeight : '400'
                                }}
                            >{this.state.data.title}</Text>
                        </View>
                        
                        <View>
                            <Text
                                style = {{
                                    fontSize : 15,
                                    color : '#5f6368',
                                    fontFamily : 'sans-serif',
                                    fontWeight : '400'
                                }}
                            >{this.state.data.professor} • {postdate}</Text>
                        </View>
                        <View>
                            <Text
                                style = {{
                                    fontSize : 15,
                                    color : '#3c4043',
                                    fontFamily : 'Roboto',
                                    fontWeight : '500'
                                }}
                            >{duedate}</Text>
                        </View>
                        <View>
                            <Text
                                style = {{
                                    fontSize : 15,
                                    color : '#3c4043',
                                    fontFamily : 'Roboto',
                                    fontWeight : '400'
                                }}
                            >{this.state.data.description}</Text>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        padding : 10,
    },
    header : {
        borderBottomWidth : 1,
        borderBottomColor : '#4285f4',
        marginBottom : 10,
    },
    box : {
        backgroundColor : 'white',
        borderRadius : 15,
        elevation : 3,
        padding : 5,
    },
    
})

export default QuizComponent;