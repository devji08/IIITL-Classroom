import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon, Input, Text} from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { createAssignment } from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
    user : state.authentication.user,
    isLoading : state.CreateAssignmemtReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
    createAssignmemt : (data) => dispatch(createAssignment(data)),
});

class AddAssignmentComponent extends Component {

    state = {
        data : this.props.route.params.data,
        file : null,
        title : null,
        description : null,
        points : null,
        due : new Date(),
        show : false,
        postdate : null,
    };

    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled){
            this.setState({file : result})
        }
	}

    onChange = (event, selectedDate) => {
        var postdate = ((selectedDate).toDateString().substring(0,10));
        this.setState({due : selectedDate, postdate : postdate, show : false});
    };

    render() {
        var postdate = ((new Date()).toDateString().substring(0,10));

        this.props.navigation.setOptions({title : `${this.state.data.subname}`})
        return(
            <View style = {styles.container}>
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
                        >Create the {this.state.data.type}</Text>
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
                        >{this.props.user.displayName} • {postdate}</Text>
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
                        >Fill the form</Text>
                    </View>
                    
                </View>
                <View style = {{padding : 10, marginBottom : 20}}>
                <Input
                    placeholder = "Title"
                    value = {this.state.title}
                    onChangeText = {(title) => {this.setState({title})}}
                    leftIcon = {
                        <Icon
                            type = "material"
                            name = "description"
                            size = {15}
                            color ='grey'
                        />
                    }
                />
                <Input
                    placeholder="Description"
                    value = {this.state.description}
                    onChangeText = {(description) => {this.setState({description})}}
                    leftIcon = {
                        <Icon
                            type = "material"
                            name = "description"
                            size = {15}
                            color ='grey'
                        />
                    }
                />
                <Input
                    placeholder="Maximum Marks"
                    value = {this.state.points}
                    onChangeText = {(points) => {this.setState({points})}}
                    leftIcon = {
                        <Icon
                            type = "material"
                            name = "description"
                            size = {15}
                            color ='grey'
                        />
                    }
                />
                <TouchableOpacity
                    activeOpacity = {0.5}
                    onPress = {() => { this.setState({show : true})}}
                >
                    <Input
                        placeholder="Due date"
                        disabled
                        value = {this.state.postdate}
                        leftIcon = {
                            <Icon
                                type = "material"
                                name = "event"
                                size = {15}
                                color ='grey'
                            />
                        }
                    />
                </TouchableOpacity>
                    {this.state.show && (<DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.due}
                        mode= 'date'
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />)}
                </View>
                <View>
                    <View style = {{marginBottom : 10}}>
                        {this.state.file != null ? 
                            <View style = {{borderWidth: 1, borderRadius : 15, borderColor : '#dadce0', marginBottom : 10}}>
                                <View style = {{flexDirection : 'row'}}>
                                        <View
                                            style = {{
                                                marginRight : 10,
                                                borderRightWidth : 1,
                                                borderRightColor : '#e0e0e0',
                                                padding : 5,
                                                marginRight : 15
                                            }}
                                        >
                                            <Icon
                                                type = 'font-awesome-5'
                                                name = 'file-pdf'
                                                size = {50}
                                                color = '#d14f2e'
                                                containerStyle = {{padding : 5}}
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
                                            >{this.state.file.name}</Text>
                                        </View>
                                    </View>
                            </View>
                            : 
                            <Button
                                type = 'clear'
                                icon={
                                    <Icon
                                    type = 'font-awesome-5'
                                    name = 'plus'
                                    size = {15}
                                    color = '#1967d2'
                                    containerStyle = {{marginRight : 5}}
                                    />}
                                title = 'Add or create'
                                titleStyle = {{fontWeight : 'bold'}}
                                color = 'white'
                                onPress = {() => this._pickDocument()}
                            />
                    }
                    </View>

                    <Button
                        type = 'solid'
                        title = 'Submit'
                        color = 'white'
                        onPress = {this.state.file == null ?
                                    () => console.log("No file added")
                                    :
                                    () => {this.props.createAssignmemt({
                                                        file : this.state.file.uri,
                                                        professor : this.props.user.displayName,
                                                        title : this.state.title,
                                                        postdate : postdate,
                                                        due : this.state.due,
                                                        description : this.state.description,
                                                        points : this.state.points,
                                                        subcode : this.state.data.subcode,
                                                        type : this.state.data.type,
                                                        navigation : this.props.navigation
                                                    })}
                                }
                        loading = {this.props.isLoading}
                        titleStyle = {{fontWeight : 'bold'}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        padding : 10,
        backgroundColor : 'white',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAssignmentComponent);