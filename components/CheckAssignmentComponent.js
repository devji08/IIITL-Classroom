import React, { Component } from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import { Text, Icon, Button, Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux' 
import { checkAssignment } from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
    isLoading : state.CheckAssignmemtReducer.isLoading,
})

const mapDispatchToProps = dispatch => ({
    checkAssignment : (data) => dispatch(checkAssignment(data)),
});

class CheckAssignmentComponent extends Component {

    state = {
        data : this.props.route.params.data,
        assignment : this.props.route.params.assignment,
        totalMarks : 0,
        marksArr: [],
        visited: [],
        errors: [],
    };
    
    componentDidMount() {
        var len = this.state.assignment.pointsDistribution.length;
        var marksArr=[];
        var visited=[];
        var errors = this.state.errors;
        for(var i=0; i<len; i++) {
            marksArr.push(0);
            errors.push("");
            visited.push(0);
        }
        this.setState({marksArr, visited, errors});
    }

    _handleMarksChange(marks, i) {
        var marksArr=this.state.marksArr;
        marksArr[i]=isNaN(parseInt(marks))? 0 : parseInt(marks);
        var totalMarks = 0;
        for(var j=0; j<marksArr.length; j++) {
                totalMarks+=marksArr[j];
        }
        var errors = this.state.errors;
        var pointsDistribution = this.state.assignment.pointsDistribution;
        if(marksArr[i] > pointsDistribution[i]) {
            errors[i] = `Cannot be greater than ${pointsDistribution[i]}`;
        } else if(marksArr[i] < 0) {
            errors[i] = `Cannot be smaller than 0`;
        } else {
            errors[i] = "";
        }
        var visited = this.state.visited;
        visited[i]=(marks == "")? 0 : 1;
        this.setState({marksArr, totalMarks, visited, errors});
    }

    _handleSubmit() {
        var marksArr = this.state.marksArr;
        var pointsDistribution = this.state.assignment.pointsDistribution;
        var visited = this.state.visited;
        var errors = this.state.errors;
        var len = marksArr.length, f=1;
        for(var i=0; i<len; i++) {
            if(marksArr[i] > pointsDistribution[i]) {
                errors[i] = `Cannot be greater than ${pointsDistribution[i]}`;
                f=0;
            } else if(marksArr[i] < 0) {
                errors[i] = `Cannot be smaller than 0`;
                f=0;
            } else if(visited[i] == 0) {
                errors[i] = `Cannot be empty`;
                f=0;
            }
        }
        if(f) {
            this.props.checkAssignment({
                subcode : this.state.assignment.subcode,
                title : this.state.assignment.title,
                email : this.state.data.email,
                totalMarks : this.state.totalMarks,
                marksArr: this.state.marksArr,
                navigation : this.props.navigation
            });
        } else {
            this.setState({errors});
        }
    }

    render() {
        console.log(this.state);
        var d = new Date(this.state.data.date.seconds * 1000);
        var postdate = (d.toDateString().substring(0,10));
        var posttime = d.toTimeString().substring(0,5);
        d = new Date(this.state.assignment.due.seconds * 1000);
        var duedate = (d.toDateString().substring(0,10));

        this.props.navigation.setOptions({title : `${this.state.data.username}`});

        return(
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
                            >{this.state.assignment.title}</Text>
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
                            >{this.state.data.username} • {postdate} - {posttime}</Text>
                        </View>
                        <View>
                            <View style = {{flexDirection : 'row'}}>
                                <Text style = {{flex : 1, color : '#5f6368'}}>{this.state.assignment.points} points</Text>
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
                            >{`${this.state.data.username} has submitted the following file.`}</Text>
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
                                    >{this.state.data.filename}</Text>
                                </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View>
                    <View style = {{padding : 20, backgroundColor : 'white', borderRadius : 15, borderColor : '#dadce0', borderWidth : 1, marginBottom : 10}}>
                        {
                            this.state.marksArr.map((e, i) => (
                                <Input
                                    key={i}
                                    keyboardType = 'number-pad'
                                    placeholder = {`${this.state.assignment.pointsDescription[i]} (${this.state.assignment.pointsDistribution[i]})`}
                                    value={e>0 ? e.toString() : 0}
                                    onChangeText = {(marks) => this._handleMarksChange(marks ,i)}
                                    leftIcon = {
                                        <Icon
                                            type = "material"
                                            name = "description"
                                            size = {15}
                                            color ='grey'
                                        />
                                    }
                                    errorMessage={this.state.errors[i]}
                                />
                            ))
                        }
                        
                        <Input
                            placeholder = "Marks Obtained"
                            value = {"Total = "+this.state.totalMarks.toString()}
                            editable = {false}
                            style = {{color: "grey"}}
                            leftIcon = {
                                <Icon
                                    type = "material"
                                    name = "description"
                                    size = {15}
                                    color ='grey'
                                />
                            }
                        />
                        <Button
                        type = 'solid'
                        title = 'Submit'
                        color = 'white'
                        onPress = {() => this._handleSubmit()}
                        loading = {this.props.isLoading}
                        titleStyle = {{fontWeight : 'bold'}}
                    />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        padding : 10,
        flex : 1
    },
    box : {
        padding : 4,
        backgroundColor : 'white',
        borderRadius : 15,
        borderColor : '#dadce0',
        borderWidth : 1,
        flexDirection : 'row',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckAssignmentComponent);