import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon, Input, Text} from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler'
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
        title : "",
        description : "",
        due : null,
        show : false,
        points : 0,
        pointsDescription: [""],
        pointsDistribution: [0],
        errors: {
            title: "",
            due: "",
            file: "",
            pointsDescription0: "",
            pointsDistribution0: ""
        }
    };

    _addPointsCategory = () => {
        var pointsDescription = [...this.state.pointsDescription, ""];
        var pointsDistribution = [...this.state.pointsDistribution, 0];
        var len = this.state.pointsDescription.length;
        var errors = this.state.errors;
        errors[`pointsDescription${len}`] = "";
        errors[`pointsDistribution${len}`] = "";
        this.setState({
            pointsDescription,
            pointsDistribution,
            errors,
        });
    }

    _pointsDescriptionChange(category, i) {
        var arr=this.state.pointsDescription;
        arr[i]=(category.trimStart());
        var errors = this.state.errors;
        errors[`pointsDescription${i}`] = ((arr[i] == "")? "Cannot be empty": "");
        this.setState({pointsDescription: arr, errors});
    }

    _pointsDistributionChange(points, i) {
        var arr=this.state.pointsDistribution;
        arr[i]=(isNaN(parseInt(points))? 0: parseInt(points));
        var sum = 0;
        for(var j=0; j<arr.length; j++) sum+=arr[j];
        var errors = this.state.errors;
        errors[`pointsDistribution${i}`] = ((arr[i] == 0)? "required": "");
        this.setState({pointsDistribution: arr, points: sum, errors});
    }

    _deletePointsCategory(i) {
        if(this.state.pointsDescription.length === 1) return;
        var newPointsDescription = this.state.pointsDescription.filter((e, _i) => {
            if(_i!==i) return true;
        });
        var newPointsDistribution = this.state.pointsDistribution.filter((e, _i) => {
            if(_i!==i) return true;
        });
        var len = this.state.pointsDescription.length;
        var errors = this.state.errors;
        for(var j=i; j<len-1; j++) {
            errors[`pointsDescription${j}`] = errors[`pointsDescription${j+1}`];
            errors[`pointsDistribution${j}`] = errors[`pointsDistribution${j+1}`];
        }
        delete errors[`pointsDescription${len-1}`];
        delete errors[`pointsDistribution${len-1}`];
        this.setState({
            pointsDescription: newPointsDescription,
            pointsDistribution: newPointsDistribution,
            errors
        });
    }

    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(result.type == "success") {
            this.setState({file : result, errors: {...this.state.errors, file: ""}});
        }
        if(!this.state.file) this.setState({errors: {...this.state.errors, file: "File required"}});
	}

    _dateChange = (event, selectedDate) => {
        if(selectedDate) {
            this.setState({due : selectedDate, show : false, errors: {...this.state.errors, due: ""}});
        } else {
            var errors = this.state.errors;
            if(!this.state.due) errors.due = "Due date required";
            this.setState({show: false, errors});
        }
    };

    _handleSubmit() {
        var f = 1;
        var errors = this.state.errors;
        if(!this.state.title) f=0, errors.title = "Title cannot be empty"
        if(!this.state.due) f=0, errors.due = "Due date required"
        if(!this.state.file) f=0, errors.file = "File required"
        var pointsDescription = this.state.pointsDescription;
        var pointsDistribution = this.state.pointsDistribution;
        var len = pointsDescription.length;
        for(var i=0; i<len; i++) {
            if(!pointsDescription[i]) f=0, errors[`pointsDescription${i}`] = "Cannot be empty";
            if(!pointsDistribution[i]) f=0, errors[`pointsDistribution${i}`] = "required";
        }

        if(f) {
            this.props.createAssignmemt({
                file : this.state.file?.uri,
                professor : this.props.user.displayName,
                title : this.state.title,
                postdate : (new Date()),
                due : this.state.due,
                description : this.state.description,
                points : this.state.points,
                pointsDescription : this.state.pointsDescription,
                pointsDistribution : this.state.pointsDistribution,
                subcode : this.state.data.subcode,
                type : this.state.data.type,
                navigation : this.props.navigation
            });
        } else {
            this.setState({errors});
        }
    }

    render() {
        var currentDate = ((new Date()).toDateString().substring(0,10));

        this.props.navigation.setOptions({title : `${this.state.data.subname}`})
        return(
            <ScrollView>
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
                        >{this.props.user.displayName} • {currentDate}</Text>
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
                <View style = {{padding : 5}}>
                <Input
                    placeholder = "Title"
                    value = {this.state.title}
                    onChangeText = {(title) => {
                        if(title === "") {
                            this.setState({errors: {...this.state.errors, title: "Title cannot be empty"}, title});
                        } else {
                            this.setState({errors: {...this.state.errors, title: ""}, title});
                        }
                    }}
                    leftIcon = {
                        <Icon
                            type = "material"
                            name = "description"
                            size = {15}
                            color ='grey'
                        />
                    }
                    errorMessage = { this.state.errors.title }
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
                
                <TouchableOpacity
                    onPress = {() => { this.setState({show : true})}}
                >
                    <View pointerEvents='none'>
                        <Input
                            placeholder="Due date"
                            value = {this.state.due?.toDateString().substring(0,10)}
                            leftIcon = {
                                <Icon
                                    type = "material"
                                    name = "event"
                                    size = {15}
                                    color ='grey'
                                />
                            }
                            errorMessage={this.state.errors.due}
                        />
                    </View>
                </TouchableOpacity>
                    {this.state.show && (<DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.due? this.state.due : new Date()}
                        mode= 'date'
                        is24Hour={true}
                        display="default"
                        onChange={this._dateChange}
                        minimumDate={new Date()}
                    />)}

                <View style={{marginBottom: 2}}>
                    <View style={{paddingHorizontal: 10, marginBottom: 10}}>
                        <Text style={{fontSize: 18, color: "grey"}}>Marks Distribution :</Text>
                    </View>
                    {
                        this.state.pointsDescription.map((e, i) => (
                            <View style={{flexDirection: "row"}} key={i}>
                                <View style={{flex: 0.1, paddingTop: 15}}>
                                    <Icon
                                        type = 'font-awesome-5'
                                        name = 'trash'
                                        size = {15}
                                        color = 'grey'
                                        onPress={() => this._deletePointsCategory(i)}
                                    />
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Input 
                                        placeholder="Category"
                                        style={{paddingLeft: 2}}
                                        value={e}
                                        onChangeText={(value) => this._pointsDescriptionChange(value, i)}
                                        errorMessage={this.state.errors[`pointsDescription${i}`]}
                                    />
                                </View>
                                <View style={{flex: 0.3}}>
                                    <Input 
                                        placeholder="Marks"
                                        keyboardType = 'number-pad'
                                        style={{paddingLeft: 2}}
                                        value={this.state.pointsDistribution[i]>0 ? this.state.pointsDistribution[i].toString() : ""}
                                        onChangeText={(points) => this._pointsDistributionChange(points, i)}
                                        errorMessage={this.state.errors[`pointsDistribution${i}`]}
                                    />
                                </View>
                            </View>
                        ))
                    }
                    
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
                        title = 'Add a category'
                        titleStyle = {{fontWeight : 'bold'}}
                        onPress = {() => this._addPointsCategory()}
                    />
                </View>

                <Input
                    editable={false}
                    placeholder="Maximum Marks"
                    value = {"Total = "+this.state.points.toString()}
                    style={{color: "grey"}}
                    leftIcon = {
                        <Icon
                            type = "material"
                            name = "description"
                            size = {15}
                            color ="grey"
                        />
                    }
                />
                </View>
                <View>
                    <View style = {{marginBottom : 10}}>
                        {this.state.file != null ? 
                            <TouchableOpacity onPress={this._pickDocument}>
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
                            </TouchableOpacity>
                            : 
                            <View>
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
                                    title = 'Attach a file'
                                    titleStyle = {{fontWeight : 'bold'}}
                                    color = 'white'
                                    onPress = {() => this._pickDocument()}
                                />
                                {this.state.errors.file != "" && 
                                    <Text style={{textAlign: 'center', color: "red"}}>
                                        {this.state.errors.file}
                                    </Text>
                                }
                            </View>
                    }
                    </View>

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
            </ScrollView>
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