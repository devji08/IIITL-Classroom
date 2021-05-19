import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView} from 'react-native-gesture-handler'
import  { fetchAssignment } from '../redux/ActionCreators'
import AssignmentComponent from './AssignmentComponent'
import  { fetchQuiz } from '../redux/ActionCreators'

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
            obj["id"] = "ass"
            objs.push(obj)
        });
        var quizes = [];
        if(this.props.quiz != null) quizes = Object.keys(this.props.quiz);
        quizes.forEach((key) => {
            var obj = this.props.quiz[key];
            obj["id"] = "quiz";
            objs.push(obj);
        });

        objs.sort((a, b) => b.postdate - a.postdate)
        
        if(objs.length == 0) return(<View></View>)
        return(
            <ScrollView>
                <View style = {styles.container}>
                    {
                        objs.map(obj => (
                            <AssignmentComponent key = {obj.title} ass = {obj} navigate = {this.props.navigate}/>       
                        ))
                    }
                </View>
            </ScrollView>
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