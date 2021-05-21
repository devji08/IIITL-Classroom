import React, { Component } from 'react'
import {View, StyleSheet, Text, Linking} from 'react-native'
import {Icon, Button} from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler'

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
                        <View
                            style = {{marginBottom : 4}}
                        >                        
                            <Text
                                style = {{
                                    fontSize : 30,
                                    color : '#1967d2',
                                    fontFamily : 'Roboto',
                                    fontWeight : '400'
                                }}
                            >{this.state.data.title}</Text>
                        </View>
                        
                        <View
                            style = {{marginBottom : 4}}
                        >
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
                                    fontWeight : '500',
                                    textAlign : 'right'
                                }}
                            >Due {duedate}</Text>
                        </View>
                        
                    </View>
                    <View
                        style = {{marginBottom : 10}}
                    >
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
                
                <TouchableOpacity
                    activeOpacity = {0.5}
                    onPress = {() => { Linking.openURL(this.state.data.file)}}
                >
                    <View
                        style = {{marginBottom : 10}}
                    >
                        <View style = {styles.box}>
                                <View
                                    style = {{
                                        marginRight : 10,
                                        borderRightWidth : 1,
                                        borderRightColor : '#e0e0e0'
                                    }}
                                >
                                    <Icon
                                        type = 'font-awesome-5'
                                        name = 'file-pdf'
                                        size = {50}
                                        color = '#a62c2b'
                                        containerStyle = {{padding : 4}}
                                    />
                                </View>
                                <View
                                    style = {{alignSelf : 'center' }}
                                >
                                    <Text
                                        style = {{
                                            fontSize : 15,
                                            color : '#3c4043',
                                            fontFamily : 'Roboto',
                                            fontWeight : '400',
                                        }}
                                    >{this.state.data.title}</Text>
                                </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View>
                    <View style = {styles.elevation}>
                        <View>
                            <Text
                             style = {{
                                fontSize : 18,
                                color : '#3c4043',
                                fontFamily : 'Roboto',
                                fontWeight : '400',
                                marginBottom : 10
                            }}>
                                Your Work
                            </Text>           
                        </View>
                        <View>

                        </View>
                        <View
                            style = {{
                                borderWidth : 1,
                                borderRadius : 5,
                                borderColor : '#dadce0'
                            }}
                        >
                            <Button
                                type = 'clear'
                                title = 'Submit'
                                color = 'white'
                                onPress = {console.log("submitted")}
                            />
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
        padding : 4,
        backgroundColor : 'white',
        borderRadius : 15,
        borderColor : '#dadce0',
        borderWidth : 1,
        flexDirection : 'row',
    },
    elevation : {
        padding : 20,
        elevation : 2,
        borderRadius : 15
    }
    
})

export default QuizComponent;