import React, { Component } from 'react'
import { connect } from 'react-redux'
import Subject from './SubjectComponent.js';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchSubject } from '../redux/ActionCreators.js';
import { Loading } from './loadingComponent.js';

const mapStateToProps = (state) => {
    return {
        user : state.authentication.user,
        subjects : state.subjectReducer.subjects,
        isLoading : state.subjectReducer.isLoading,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSubject : (sem) => dispatch(fetchSubject(sem)),
});


export class Subjects extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        var year  = parseInt(this.props.user.email.substring(3,7));
        var currentDate = new Date();
        var addmissionDate = new Date(year, 7, 1);
        var sem = Math.ceil((currentDate - addmissionDate)/(1000*60*60*24*30*6));
        if(this.props.subjects == null) this.props.fetchSubject(sem);
        if(this.props.isLoading){
            return (<Loading/>);
        }
        else{
            var subs = Object.keys(this.props.subjects);
            return (
                <ScrollView style={styles.container}>
                    {
                        subs.map(sub => (
                            <Subject key={sub} sem={sem+'th semester'} navigate={navigate} subCode={sub} subName={this.props.subjects[sub]}/>
                        ))
                    }
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ddd',
        flex : 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)