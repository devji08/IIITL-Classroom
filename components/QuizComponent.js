import React, { Component } from 'react'
import {View, StyleSheet, Text, Linking} from 'react-native'
import { connect } from 'react-redux'
import {Icon, Button} from 'react-native-elements'
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler'
import * as DocumentPicker from 'expo-document-picker'
import { submitAssignment } from '../redux/ActionCreators'
import db from './firebase.js'

const mapStateToProps = (state) => ({
    user : state.authentication.user,
    isLoading : state.submitAssignmemtReducer.isLoading,
})

const mapDispatchToProps = dispatch => ({
    submitAssignment : (data, file) => dispatch(submitAssignment(data, file)),
});

class QuizComponent extends Component {

    state = {
        data : this.props.route.params.data,
        file : null,
        added : false,
        myWork : null,
        records : null
    };

    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled){
            this.setState({added : true, file : result})
        }
	}

    unSubmitWork = () => {
        var obj = this.state.records;
        delete obj[this.props.user.email];
        db.collection(`${this.state.data.subcode}`).doc(`${this.state.data.title}`).set(obj);
    }

    componentDidMount() {
        console.log(this.state.data);
        db.collection(`${this.state.data.subcode}`).doc(`${this.state.data.title}`)
        .onSnapshot((doc) => {
            console.log(doc.data());
            var records = doc.data() || {};
            var myWork = null;
            if(this.props.user.email in records){
                myWork = records[this.props.user.email];
            }
            if( myWork != null){
                this.setState({myWork : myWork, records : records});
            }
            else{
                this.setState({myWork : null, records : records, added : false});
            }
        });
    }

    submissionComponent = (props) => {
        var data = props.data;
        return(
            
            <TouchableOpacity
                activeOpacity = {0.5}
                onPress = {() => { props.navigation.navigate('CheckAssignment',{data : data, assignment : this.state.data})}}
                style = {{padding : 10, flexDirection : 'row', marginBottom : 10, elevation : 1, borderWidth : 1,borderRadius : 15, borderColor : '#dadce0',}}
            >
                <View style = {{flex : 7, borderRightWidth : 1, borderColor : '#dadce0', marginRight : 20}}>
                    <Text>{data.username}</Text>
                    <Text>{data.email}</Text>
                </View>
                <View style = {{flex: 1,alignSelf : 'center'}}>
                    <Text style = {{}}>{data.marks}</Text>
                </View>
                
            </TouchableOpacity>
        )
    }

    render() {
        const navigation = this.props.navigation;
        navigation.setOptions({title : this.state.data.subname});

        var d = new Date(this.state.data.postdate.seconds * 1000);
        var postdate = (d.toDateString().substring(0,10));
        d = new Date(this.state.data.due.seconds * 1000);
        var duedate = (d.toDateString().substring(0,10));

        var submissions = [];
        if(this.state.records != null){
            var arr = Object.keys(this.state.records);
            arr.map(key => {submissions.push(this.state.records[key])});
        }
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

 
 
 
 
 
 
 
 
                {this.props.user.profession != 'Professor'?
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
                                    borderColor : '#dadce0',
                                    marginBottom : 10
                                }}
                            >
                                {this.state.myWork != null ? 
                                    <View>
                                        <View
                                        >
                                            <View style = {{flexDirection : 'row', padding : 5}}>
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
                                                        >{this.state.myWork.filename}</Text>
                                                    </View>
                                            </View>
                                        </View>
                                    </View>
                                    : 
                                    this.state.added ?
                                    <View>
                                        <View
                                        >
                                            <View style = {{flexDirection : 'row', padding : 5}}>
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
                            <View
                                style = {{
                                    borderWidth : 1,
                                    borderRadius : 5,
                                    borderColor : '#dadce0',
                                    marginBottom : 10
                                }}
                            >
                                <Button
                                    type = 'solid'
                                    title = {this.state.myWork != null ? 'Unsubmit' : 'Submit'}
                                    color = 'white'
                                    onPress = {this.state.myWork == null ? this.state.file == null ? console.log("No file added"):
                                                () => this.props.submitAssignment({subcode : this.state.data.subcode, username : this.props.user.displayName, email : this.props.user.email, title : this.state.data.title}, this.state.file)
                                                :
                                                () => {this.unSubmitWork()}
                                            }
                                    loading = {this.props.isLoading}
                                    titleStyle = {{fontWeight : 'bold'}}
                                />
                            </View>
                        </View>
                    </View>
                    :
                    <View>
                        <View style = {{padding : 10, borderRadius : 15, borderColor : '#dadce0', borderWidth : 1}}>
                            <Text style ={{fontSize : 25, color : '#3c4043', fontFamily : 'Roboto', fontWeight : '400', marginBottom : 10, borderBottomColor : '#dadce0', borderBottomWidth : 1, padding : 10}}>Submissions</Text>
                            {submissions.length == 0 ? 
                            <View style = {{padding : 10}}>
                                <Text style = {{fontSize : 15, color : 'gray', fontFamily : 'Roboto',fontWeight : '400', marginBottom : 10}}>No submissions are available currently.</Text>
                            </View>
                            :
                            <ScrollView>
                                {submissions.map(data => (<this.submissionComponent data = {data} key = {data.email} navigation = {this.props.navigation}/>))}
                            </ScrollView>}
                        </View>
                    </View>
                }                        
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);