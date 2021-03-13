import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView} from 'react-native-gesture-handler'
import  { fetchAssignment } from '../redux/ActionCreators'
import AssignmentComponent from './AssignmentComponent'

const mapStateToProps = (state) => ({
    user : state.authentication.user,
    assignments : state.assignmentReducer.assignments
})

const mapDispatchToProps = dispatch => ({
    fetchAssignment : (subCode) => dispatch(fetchAssignment(subCode))
})

class ClassroomComponent extends Component {

    componentDidMount() {
        this.props.fetchAssignment(this.props.subCode);
    }

    render() {
        if(this.props.assignments == null) return(<View></View>)
        var ass = Object.keys(this.props.assignments);
        return(
            <ScrollView>
                <View style = {styles.container}>
                    {
                        ass.map(ass => (
                            <AssignmentComponent key = {this.props.assignments[ass].title} ass = {this.props.assignments[ass]}/>       
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