import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import {ScrollView} from 'react-native-gesture-handler'
import  { fetchAssignment } from '../redux/ActionCreators'
import AssignmentComponent from './AssignmentComponent'
import  { fetchQuiz } from '../redux/ActionCreators'
import { FloatingAction } from "react-native-floating-action"
import { createIconSetFromFontello } from 'react-native-vector-icons'

const mapStateToProps = (state) => ({
    user : state.authentication.user,
    assignments : state.assignmentReducer.assignments,
    quiz : state.quizReducer.quiz
})

const mapDispatchToProps = dispatch => ({
    fetchAssignment : (subCode) => dispatch(fetchAssignment(subCode)),
    fetchQuiz : (subCode) => dispatch(fetchQuiz(subCode))
})

class ClassroomComponent extends Component {

    componentDidMount() {
        this.props.fetchAssignment(this.props.subCode);
        this.props.fetchQuiz(this.props.subCode);
    }

    render() {
        var objs = [];
        var ass= [];
        if(this.props.assignments != null) ass = Object.keys(this.props.assignments);
        ass.forEach((key) => {
            var obj = this.props.assignments[key];
            obj["id"] = "ass";
            obj["subcode"] = this.props.subCode;
            obj["subname"] = this.props.subName;
            objs.push(obj)
        });
        var quizes = [];
        if(this.props.quiz != null) quizes = Object.keys(this.props.quiz);
        quizes.forEach((key) => {
            var obj = this.props.quiz[key];
            obj["id"] = "quiz";
            obj["subcode"] = this.props.subCode;
            obj["subname"] = this.props.subName;
            objs.push(obj);
        });

        objs.sort((a, b) => b.postdate - a.postdate)
        
        const actions = [
            {
              text: "Assignment",
              icon: <Icon
                        round
                        type = 'material'
                        name = 'assignment'
                        color = 'white'
                        size = {25}
                    />,
              name: "bt_assignment",
              position: 2
            },
            {
              text: "Quiz",
              icon: <Icon
                        round
                        type = 'material-icons'
                        name = 'assignment'
                        size = {25}
                        color = 'white'
                    />,
              name: "bt_quiz",
              position: 1
            }
          ];
        if(objs.length == 0) return(<View></View>)
        return(
            <View style = {{flex : 1}}>
                <ScrollView>
                    <View style = {styles.container}>
                        {
                            objs.map(obj => (
                                <AssignmentComponent key = {obj.title} ass = {obj} navigate = {this.props.navigate}/>       
                            ))
                        }
                        
                    </View>
                </ScrollView>
                {this.props.user.profession == 'Professor' ? <FloatingAction
                actions={actions}
                overlayColor = 'rgba(68, 68, 68, 0.1)'
                onPressItem={name => {
                    var type;
                    if(name == 'bt_quiz') type = 'Quiz';
                    else type = 'Assignments';
                    this.props.navigate('AddAssignment', {data : {subcode : this.props.subCode, type : type, subname : this.props.subName}});
                }}
                />
                :
                <View></View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomComponent)